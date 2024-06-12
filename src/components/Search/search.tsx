"use client"

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Input from "@/components/UI/Input";
import { debounce } from '@/utils/debounce';

const searchDebounce = debounce((cb: () => void) => cb(), 700);
 
export const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
 
  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    
    searchDebounce(() => {
      if (query) {
        params.set('query', query);
      } else {
        params.delete('query');
      }
  
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <Input
      placeholder="Search by launch name..."
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get('query')?.toString()}
    />
  )
}
