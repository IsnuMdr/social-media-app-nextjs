import { useRouter } from "next/router";

export default function PostPage() {
  const router = useRouter();
  return <div>[router.query.postId]</div>;
}
