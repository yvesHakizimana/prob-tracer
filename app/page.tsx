import Pagination from "@/app/Pagination";

export default function Home() {
  return (
    <Pagination itemsCount={100} currentPage={20} pageSize={5} />
  )
}
