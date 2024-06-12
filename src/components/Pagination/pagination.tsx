"use client"

import { usePathname, useSearchParams, useRouter} from 'next/navigation';
import Button from '../UI/Button';
import { useCallback } from 'react';

interface PaginationProps { 
  totalPages: number;
  limit: number;
}
 
export const Pagination = ({ totalPages, limit }: PaginationProps ) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  let currentPageCount = Number(searchParams.get('page')) || 1;

  const updatePageCount = useCallback((page: number, delta: -1 | 1) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", (page + delta).toString());
    
    replace(`${pathname}?${params.toString()}`);
  }, [pathname, searchParams, replace]);

  return (
    <div className="flex w-full justify-between">
      <Button 
        disabled={currentPageCount == 1} 
        onClick={() => updatePageCount(currentPageCount, -1)}
      >Prev page</Button>
      <Button 
        disabled={currentPageCount == Math.ceil(totalPages / limit)} 
        onClick={() => updatePageCount(currentPageCount, 1)}
      >Next page</Button>
    </div>
  )
}
