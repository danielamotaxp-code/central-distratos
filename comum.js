// Partes comuns: endereço do repositório de dados, criptografia dos acessos e chamadas à API do GitHub.
const DONO = "danielamotaxp-code";
const REPO_SITE = "central-distratos";
const REPO_DADOS = "central-distratos-dados";
const ITERACOES = 600000; // deixa cada tentativa de senha lenta de propósito

const b64 = {
  de: buf => btoa(String.fromCharCode(...new Uint8Array(buf))),
  para: s => Uint8Array.from(atob(s), c => c.charCodeAt(0)),
};
function bytesParaBase64(u8) {
  let s = ""; const passo = 0x8000;
  for (let i = 0; i < u8.length; i += passo) s += String.fromCharCode.apply(null, u8.subarray(i, i + passo));
  return btoa(s);
}

async function chaveDaSenha(senha, salt, iter) {
  const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(senha), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey({ name: "PBKDF2", salt, iterations: iter, hash: "SHA-256" },
    base, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
}
async function cifrar(texto, senha) {
  const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
  const k = await chaveDaSenha(senha, salt, ITERACOES);
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, k, new TextEncoder().encode(texto));
  return { salt: b64.de(salt), iv: b64.de(iv), dados: b64.de(ct), iter: ITERACOES };
}
async function decifrar(reg, senha) {
  const k = await chaveDaSenha(senha, b64.para(reg.salt), reg.iter || ITERACOES);
  const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64.para(reg.iv) }, k, b64.para(reg.dados));
  return new TextDecoder().decode(pt);
}

function caminhoApi(p) { return p.split("/").map(encodeURIComponent).join("/"); }

async function gh(token, metodo, rota, corpo, aceitar) {
  const r = await fetch("https://api.github.com" + rota, {
    method: metodo, cache: "no-store",
    headers: { Authorization: "Bearer " + token, Accept: aceitar || "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28", ...(corpo ? { "Content-Type": "application/json" } : {}) },
    body: corpo ? JSON.stringify(corpo) : undefined,
  });
  if (!r.ok) {
    let msg = ""; try { msg = (await r.json()).message || ""; } catch (_) {}
    const e = new Error(msg || ("Erro " + r.status)); e.status = r.status; throw e;
  }
  return r;
}
const conteudo = (repo, p) => `/repos/${DONO}/${repo}/contents/${caminhoApi(p)}`;
