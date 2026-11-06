// TanStack Query 全局配置 + 预取工具
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5 分钟内不重复请求
      staleTime: 5 * 60 * 1000,
      // 切回标签页不自动刷新
      refetchOnWindowFocus: false,
      // 网络错误不重试（弱网下避免雪崩）
      retry: (failureCount, error) => {
        if (failureCount >= 1) return false;
        return true;
      },
      // 后台预取时不抛错到边界
      throwOnError: false,
    },
  },
});

// 预取产品列表（首页/分类页用）
export async function prefetchProductList(categoryId?: string) {
  await queryClient.prefetchQuery({
    queryKey: ['products', categoryId ?? 'all'],
    queryFn: async () => {
      const res = await fetch(`/api/products${categoryId ? `?category=${categoryId}` : ''}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });
}

// 预取产品详情（悬停卡片时触发）
export async function prefetchProductDetail(slug: string) {
  await queryClient.prefetchQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const res = await fetch(`/api/produit/${slug}`);
      if (!res.ok) throw new Error('Failed to fetch product');
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });
}

// 预取下一页（无限滚动/分页用）
export async function prefetchNextPage(categoryId: string, page: number) {
  await queryClient.prefetchQuery({
    queryKey: ['products', categoryId, page],
    queryFn: async () => {
      const res = await fetch(`/api/products?category=${categoryId}&page=${page}`);
      if (!res.ok) throw new Error('Failed to fetch page');
      return res.json();
    },
  });
}