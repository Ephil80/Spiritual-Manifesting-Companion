export default {
  async fetch(request) {
    return new Response("✨ Spiritual Manifesting Companion is live on Cloudflare!", {
      headers: { "content-type": "text/plain" },
    });
  },
};
