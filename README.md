# 🎣 Pescador Max - App Zepp OS para Amazfit Bip Max

Aplicativo nativo para smartwatches com **Zepp OS**, desenvolvido especialmente para o **Amazfit Bip Max** (código `pikew`, resolução nativa 432x514 px) e compatível com a linha Zepp OS 3.0+ / 4.x.

Funciona de forma **100% autônoma e offline** no relógio, sem necessitar de conexão com a internet ou smartphone na beira do rio.

---

## 🚀 Funcionalidades

1. **Informações Lunares & Teoria Solunar (Dia Atual)**:
   - Cálculo astronômico preciso das 8 fases lunares (Nova, Crescente, Quarto Crescente, Gibosa, Cheia, etc.).
   - Percentual exato de iluminação da lua e idade lunar em dias.
   - Avaliação do potencial de pesca do dia (**Excelente ★★★★**, **Muito Bom**, **Bom**, **Regular**).
   - Previsão dos períodos de maior e menor atividade alimentar do dia (Horários Maiores e Menores).

2. **Previsão Solunar dos Próximos 7 Dias**:
   - Calendário completo da semana com nota de pesca, fases da lua e horários solunares para planejar pescarias futuras.

3. **Defeso & Piracema no Brasil**:
   - Status visual em tempo real: **[ PESCA LIBERADA ]** ou **[ DEFESO ATIVO ]**.
   - Seletor rápido de bacia hidrográfica com persistência automática no relógio:
     - *Bacia do Rio Paraná / Sudeste / Sul* (01/nov a 28/fev)
     - *Bacia do Rio Paraguai / Pantanal* (01/nov a 31/jan)
     - *Bacia do Rio São Francisco* (01/nov a 28/fev)
     - *Bacia Amazônica / Norte* (15/nov a 15/mar)
     - *Litoral & Espécies Marinhas* (Robalo, Camarão, Caranguejo)
   - Resumo das espécies protegidas, exceções (pesque-e-solte de tucunaré/tilápia em represas) e apetrechos proibidos.

4. **Meus Pontos de Pesca (Waypoints) & Guia de Iscas**:
   - Botão **"+ MARCAR PONTO AQUI"** para salvar novos pesqueiros/pontos com data e horário no relógio.
   - Listagem dos pontos salvos com opção de remoção.
   - Guia prático com espécies e melhores iscas para:
     - Represas & Lagos
     - Rios & Corredeiras
     - Pesqueiros & Tanques
     - Mar, Praia & Costão

---

## 🛠️ Comandos de Compilação

Para compilar especificamente para o Amazfit Bip Max:
```powershell
zeus build -t "Amazfit Bip Max"
```
Ou usando npm:
```powershell
npm run build:bipmax
```

Para compilar o pacote universal (todos os dispositivos Zepp OS compatíveis):
```powershell
npm run build
```

Para rodar os testes automatizados de lógica:
```powershell
npm test
```

---

## 📲 Como Instalar no Amazfit Bip Max

1. **No Aplicativo Zepp (no Smartphone)**:
   - Acesse **Perfil** > **Configurações** > **Sobre** e toque 7 vezes na versão do app para ativar o **Modo de Desenvolvedor**.
   - Volte ao seu relógio na lista de dispositivos e entre em **Modo de Desenvolvedor**.
   - Habilite a opção **Depuração por Ponte / Bridge**.

2. **No Computador**:
   - Conecte o Zepp CLI via Bridge:
     ```powershell
     zeus bridge
     ```
   - Ou envie o arquivo `.zab` gerado na pasta `dist/` diretamente pelo instalador do app Zepp.
