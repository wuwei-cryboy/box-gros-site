// 网络质量检测 + 弱网模式 + 功能开关
// 所有开关默认 true，出问题改 false 即可，无需重新部署

export const FEATURE_FLAGS = {
  SW: true,              // Service Worker 离线缓存
  WEAK_NETWORK_DETECT: true, // 弱网自动检测
  DATA_SAVER: true,      // 省流模式（用户手动开关 + 自动检测）
} as const;

// 判断是否处于弱网环境
export async function detectWeakNetwork(): Promise<boolean> {
  if (!FEATURE_FLAGS.WEAK_NETWORK_DETECT) return false;

  // 1. Network Information API（Chrome/Edge/三星浏览器支持）
  const conn = (navigator as any).connection;
  if (conn) {
    const effectiveType = conn.effectiveType; // '2g' | '3g' | '4g' | 'slow-2g'
    const saveData = conn.saveData;           // 用户开启省流模式
    if (effectiveType === '2g' || effectiveType === 'slow-2g' || saveData) {
      return true;
    }
  }

  // 2. 兜底：发一个极小请求测延迟（超时 3 秒算弱网）
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    await fetch('/favicon.svg', { method: 'HEAD', cache: 'no-cache', signal: controller.signal });
    clearTimeout(timeout);
    return false;
  } catch {
    return true; // 超时或失败视为弱网
  }
}

// 将弱网状态挂到 <html> 类名，供 CSS 降级
export function applyWeakNetworkClass(isWeak: boolean) {
  const html = document.documentElement;
  if (isWeak) html.classList.add('weak-network');
  else html.classList.remove('weak-network');
}

// 省流模式：localStorage 持久化 + 跨标签同步
const DATA_SAVER_KEY = 'box-gros:data-saver';

export function getDataSaver(): boolean {
  if (!FEATURE_FLAGS.DATA_SAVER) return false;
  try {
    return localStorage.getItem(DATA_SAVER_KEY) === '1';
  } catch {
    return false;
  }
}

export function setDataSaver(on: boolean) {
  if (!FEATURE_FLAGS.DATA_SAVER) return;
  try {
    localStorage.setItem(DATA_SAVER_KEY, on ? '1' : '0');
    // 触发 storage 事件让其他标签页同步
    window.dispatchEvent(new StorageEvent('storage', { key: DATA_SAVER_KEY, newValue: on ? '1' : '0' }));
  } catch {}
}

// 初始化：检测弱网 + 恢复省流模式 + 监听跨标签同步
export function initNetworkFeatures() {
  // 弱网检测（仅首次）
  detectWeakNetwork().then(applyWeakNetworkClass);

  // 省流模式初始类名
  if (getDataSaver()) document.documentElement.classList.add('data-saver');

  // 跨标签同步省流开关
  window.addEventListener('storage', (e) => {
    if (e.key === DATA_SAVER_KEY) {
      const on = e.newValue === '1';
      document.documentElement.classList.toggle('data-saver', on);
    }
  });
}