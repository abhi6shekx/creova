export default async function PublicSite({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <main className="site-preview"><p>CREOVA SITE</p><h1>{slug}</h1><span>This public site will load its design and content from Supabase.</span></main>;
}
