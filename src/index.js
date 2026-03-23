// the-seam — The Seam — boundary between systems
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const cors = {"Access-Control-Allow-Origin":"*","Content-Type":"application/json"};
    if (url.pathname === "/api/health") return new Response(JSON.stringify({status:"ok",service:"the-seam"}), {headers:cors});
    return new Response(`<html><body style="background:#0a0a0a;color:#f5f5f5;font-family:monospace;padding:40px;max-width:600px;margin:0 auto"><h1>the-seam</h1><p style="color:#737373">The Seam — boundary between systems</p><pre>GET /api/health</pre><p style="color:#333;margin-top:24px">Part of <a href="https://blackroad.io" style="color:#525252">BlackRoad OS</a></p></body></html>`, {headers:{"Content-Type":"text/html"}});
  }
};
