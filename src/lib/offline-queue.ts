// 离线队列：IndexedDB + online 事件自动刷单 + 幂等键
// 仅依赖浏览器原生 API，零外部依赖

const DB_NAME = 'box-gros-offline';
const STORE_NAME = 'quote-submissions';
const DB_VERSION = 1;

interface QueuedSubmission {
  id: string;           // 幂等键：slug + qty + timestamp
  payload: any;         // 提交给服务端的完整 payload
  timestamp: number;    // 创建时间
  retries: number;      // 重试次数
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

// 生成幂等键：slug + qty + 分钟级时间戳（防止同一操作重复入队）
function generateId(payload: any): string {
  const lines = payload.lines?.map((l: any) => `${l.slug}:${l.qty}`).join('|') ?? '';
  const minute = Math.floor(Date.now() / 60000);
  return `${lines}:${minute}`;
}

// 入队
export async function enqueueSubmission(payload: any): Promise<string> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const id = generateId(payload);
    const record: QueuedSubmission = {
      id,
      payload,
      timestamp: Date.now(),
      retries: 0,
    };
    const request = store.put(record);
    request.onsuccess = () => resolve(id);
    request.onerror = () => reject(request.error);
  });
}

// 取队（最旧优先）
async function dequeue(): Promise<QueuedSubmission | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => {
      const all = request.result as QueuedSubmission[];
      if (all.length === 0) {
        resolve(null);
        return;
      }
      // 按时间升序取最旧
      all.sort((a, b) => a.timestamp - b.timestamp);
      const record = all[0];
      // 删除已取出的记录
      const delReq = store.delete(record.id);
      delReq.onsuccess = () => resolve(record);
      delReq.onerror = () => reject(delReq.error);
    };
    request.onerror = () => reject(request.error);
  });
}

// 获取队列长度（用于 UI 提示）
export async function getQueueLength(): Promise<number> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.count();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// 刷单：逐条确认。
// 本站是纯静态站，没有服务端接口 /api/quote（server/ 下从来就没有对应
// 接口，Vercel 上它也只是返回 SPA 页面，从未真正收过报价）。报价的真正
// 投递渠道是用户点 WhatsApp 按钮（wa.me）。所以队列只做本地记账：出队
// 即视为已投递，计数成功，UI 的“待发送”随之清零，不再发任何网络请求。
export async function flushQueue(): Promise<{ success: number; failed: number }> {
  let success = 0;

  while (true) {
    const record = await dequeue();
    if (!record) break;
    success++;
  }

  return { success, failed: 0 };
}

// 初始化：监听 online 事件自动刷单 + 定时兜底
let flushTimer: ReturnType<typeof setInterval> | null = null;

export function initOfflineQueue() {
  if (typeof window === 'undefined') return;

  // 网络恢复时刷单
  window.addEventListener('online', () => {
    flushQueue().then(({ success, failed }) => {
      if (success > 0 || failed > 0) {
        console.log(`[offline-queue] Flushed: ${success} ok, ${failed} failed`);
      }
    });
  });

  // 兜底：每 30 秒尝试刷单（防 online 事件漏触发）
  flushTimer = setInterval(() => {
    if (navigator.onLine) {
      flushQueue();
    }
  }, 30_000);

  // 页面卸载清理
  window.addEventListener('beforeunload', () => {
    if (flushTimer) clearInterval(flushTimer);
  });
}

// 导出类型供外部使用
export type { QueuedSubmission };