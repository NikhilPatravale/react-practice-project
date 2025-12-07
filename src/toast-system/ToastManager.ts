export type Toast = {
  id: number,
  createdAt: Date,
  content: string,
  timer: number,
  type: "SUCCESS" | "WARNING" | "ERROR"
}

export default class ToastManager {
  private static instance: ToastManager | null;
  private listeners = new Set<() => void>();
  private toasts: Toast[] = [];

  private constructor() { }

  static getInstance() {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  subscribe(fn: () => void) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  notify() {
    this.listeners.forEach((fn) => fn());
  }

  remove(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.notify();
  }

  show(toast: Omit<Toast, "id" | "createdAt">) {
    const newToast = {
      ...toast,
      id: Date.now(),
      createdAt: new Date(Date.now()),
    };
    this.toasts = [...this.toasts, newToast];
    this.notify();
    return newToast.id;
  }

  getToasts(): Toast[] {
    return this.toasts;
  }
}