import Pagination from "@/app/Pagination";


export default function Home({ searchParams: { page}} : { searchParams: { page: string } } ) {
  return (
    <Pagination itemsCount={100} currentPage={parseInt(page)} pageSize={5} />
  )
}
