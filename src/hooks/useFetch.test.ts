import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useFetch } from "./useFetch";

describe("useFetch", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should start with loading true and the initial value", () => {
    const fetcher = vi.fn(() => new Promise<string[]>(() => {}));
    const { result } = renderHook(() => useFetch(fetcher, [] as string[]));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("should expose fetched data and stop loading when the fetcher resolves", async () => {
    const mockData = ["Dark Side of the Moon", "Rumours"];
    const fetcher = vi.fn().mockResolvedValue(mockData);
    const { result } = renderHook(() => useFetch(fetcher, [] as string[]));

    await waitFor(() => expect(result.current.data).toEqual(mockData));
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should set error and stop loading when the fetcher rejects", async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error("Network error"));
    const { result } = renderHook(() => useFetch(fetcher, null));

    await waitFor(() => expect(result.current.error).toBe("Network error"));
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
  });

  it("should call the fetcher only once when dependencies do not change", async () => {
    const fetcher = vi.fn().mockResolvedValue("data");
    const { rerender } = renderHook(() => useFetch(fetcher, ""));

    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1));
    rerender();
    rerender();

    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("should re-run the fetcher when a dependency changes", async () => {
    let dep = "uskyoko";
    const fetcher = vi.fn().mockResolvedValue("data");
    const { rerender } = renderHook(() => useFetch(fetcher, null, [dep]));

    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1));

    dep = "someoneelse";
    rerender();

    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(2));
  });

  it("edge case: initial empty array is preserved while loading", () => {
    const fetcher = vi.fn(() => new Promise<never[]>(() => {}));
    const { result } = renderHook(() => useFetch(fetcher, [] as never[]));

    expect(result.current.data).toHaveLength(0);
    expect(result.current.loading).toBe(true);
  });

  it("should allow manual state updates via setData", async () => {
    const fetcher = vi.fn().mockResolvedValue("from server");
    const { result } = renderHook(() => useFetch(fetcher, ""));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toBe("from server");

    act(() => {
      result.current.setData("overridden locally");
    });

    expect(result.current.data).toBe("overridden locally");
  });
});
