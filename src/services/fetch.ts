interface IPaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null | number;
  nextPage: null | number;
}

export interface IPayload<T> {
  query?: any; //Partial<T>;
  options?: {
    select?: { [K in keyof Partial<T>]?: 1 | 0 };
    sort?: {};
    offset?: number;
    page?: number;
    limit?: number;
    pagination?: boolean;
  };
}

class Fetch {
  static async getPaginatedData<T>(
    url: string,
    payload: IPayload<T>
  ): Promise<{ error?: string; data?: IPaginatedResponse<T> }> {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) return { error: "Network response was not ok" };

      await new Promise(res => setTimeout(() => res(1), 2000));

      const data = await response.json();
      return { data };
    } catch (error: any) {
      if (typeof error == "string") return { error };

      return { error: error?.message || "Unknown error fetching data" };
    }
  }
}

export default Fetch;
