import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { PageSkeleton } from "@/components/skeletons";
import { previewPathRewrite } from "@/lib/preview-path-prefix";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    routeTree,
    rewrite: previewPathRewrite(),
    defaultErrorComponent: AppErrorComponent,
    defaultPendingComponent: PageSkeleton,
  });
}
