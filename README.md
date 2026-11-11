# Central de Distratos · código da página

Página **Central de Distratos** da [Plataforma](https://danielamotaxp-code.github.io/central-atendimento/#distratos). Ela abre dentro do portal, com o login, as permissões e as cores de lá.

| | |
|---|---|
| Endereço | [https://danielamotaxp-code.github.io/central-atendimento/#distratos](https://danielamotaxp-code.github.io/central-atendimento/#distratos) (o endereço antigo deste repositório redireciona para lá) |
| Página | `app.html` (código público, sem dados de clientes) |
| Dados | repositório privado `central-distratos-dados` |
| Ligação com o portal | `<script src="/central-atendimento/kit/modulo.js" data-modulo="distratos">` no início do `app.html` |
| Cores | `embutido.css` (WeGen verde, SmartBen azul, WattWise rosa) |

<!-- detalhes -->
## Detalhes da versão anterior

Site para gerar os Termos de Distrato da WEGEN e da SMARTBEN.

- **Site:** https://danielamotaxp-code.github.io/central-distratos/
- **Primeira vez:** abra `configurar.html`, cole a chave do GitHub e defina a senha de cada pessoa.
- **Uso:** entre com o seu nome e senha, arraste o contrato do D4Sign e baixe o distrato (PDF e Word) quando ficar pronto.

Os contratos e distratos ficam no repositório privado `central-distratos-dados`.
Este repositório público guarda só o site e o arquivo `acessos.json`, onde a chave
de acesso fica trancada pela senha de cada pessoa.
