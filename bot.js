const {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  MessageType,
  Mimetype,
  downloadMediaMessage,
} = require("@whiskeysockets/baileys");
const Groq = require("groq-sdk");
const qrcode = require("qrcode-terminal");
const fs = require("fs");
const { match } = require("assert");
const randomQuotes = require("random-quotes");
const { count } = require("console");
async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth_info");
  const { version } = await fetchLatestBaileysVersion();
  const groq = new Groq({
    apiKey: "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",
  });
  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false, // Matikan QR default
  });

  sock.ev.on("creds.update", saveCreds);

  // Menampilkan QR Code secara manual
  sock.ev.on("connection.update", (update) => {
    const { qr } = update;
    if (qr) qrcode.generate(qr, { small: true });
  });
  const levelingData = [
    { levelRange: "1-20", location: "Dataran Rakau", monster: "Lavarca" },
    { levelRange: "20-40", location: "Ngarai Lonogo", monster: "Pova" },
    {
      levelRange: "40-56",
      location: "Makam Ratu Kuno: Area 1",
      monster: "Bone Dragon",
    },
    {
      levelRange: "56-67",
      location: "Lereng Merapi: Jejak lava",
      monster: "Flare Volg (Hard)",
    },
    {
      levelRange: "67-79",
      location: "Lereng Merapi: Jejak lava",
      monster: "Flare Volg (Nightmare)",
    },
    {
      levelRange: "79-97",
      location: "Tanah Pertanian: Tanah Tinggi",
      monster: "Masked Warrior (Nightmare)",
    },
    { levelRange: "97-112", location: "Lembah Es Polde", monster: "Don Yeti" },
    {
      levelRange: "112-126",
      location: "Mata Air Kelahiran: Puncak",
      monster: "Cerberus (Nightmare)",
    },
    {
      levelRange: "126-133",
      location: "Sungai Kegelapan",
      monster: "Dukun Lapin",
    },
    {
      levelRange: "133-144",
      location: "Mata Air Kelahiran: Puncak",
      monster: "Cerberus (Ultimate)",
    },
    {
      levelRange: "144-157",
      location: "Mansion Lufenas: Pintu Masuk",
      monster: "Commander Golem",
    },
    {
      levelRange: "157-163",
      location: "Istana Ultimea: Takhta",
      monster: "Venena (Hard)",
    },
    {
      levelRange: "163-179",
      location: "Istana Ultimea: Takhta",
      monster: "Venena (Nightmare)",
    },
    {
      levelRange: "179-182",
      location: "Dataran Rokoko",
      monster: "Altoblepas",
    },
    {
      levelRange: "182-199",
      location: "Istana Ultimea: Takhta",
      monster: "Venena (Ultimate)",
    },
    {
      levelRange: "199-215",
      location: "Kuil Naga Kegelapan: Tengah",
      monster: "Finstern (Ultimate)",
    },
    {
      levelRange: "215-225",
      location:
        "Distrik Labilans: Alun-alun / Roh org mati : Lembah Arche: Area 1",
      monster: "Kuzto (Ultimate)",
    },
    {
      levelRange: "225-245",
      location: "Lembah Arche: Area Terdalam",
      monster: "Arachnidemon (Ultimate)",
    },
    {
      levelRange: "245-255",
      location: "Hutan Lindung: Pohon Raksasa",
      monster: "Ferzen (Ultimate)",
    },
    {
      levelRange: "255-265",
      location: "Zona Kemudi: Area Kokpit",
      monster: "Mimyugon (Nightmare)",
    },
    {
      levelRange: "265-270",
      location: "Kubah Espuma Depan Gerbang",
      monster: "Naga Abu Merah Rudis (Hard)",
    },
    {
      levelRange: "270-280",
      location: "Zona Kemudi: Area Kokpit",
      monster: "Mimyugon (Ultimate)",
    },
  ];
  const bossData = {
    "maton sword": {
      hp: "5.000.000",
      level: 150,
      drop: ["Maton Sword", "Maton Shield", "Maton Core"],
    },
    venena: {
      hp: "8.000.000",
      level: 180,
      drop: ["Venena Helmet", "Venena Staff", "Venena Crystal"],
    },
    zega: {
      hp: "6.500.000",
      level: 170,
      drop: ["Zega Sword", "Zega Armor", "Zega Gem"],
    },
    "tyrant machina": {
      hp: "10.000.000",
      level: 200,
      drop: ["Tyrant Sword", "Machina Core", "Tyrant Cape"],
    },
    york: {
      hp: "6.800.000",
      level: 145,
      drop: ["York Bow", "York Armor", "York Helm"],
    },
    iconos: {
      hp: "7.500.000",
      level: 160,
      drop: ["Iconos Shield", "Iconos Sword", "Iconos Crystal"],
    },
    "don yeti": {
      hp: "4.200.000",
      level: 135,
      drop: ["Don Yeti Fur", "Don Yeti Knuckles", "Frozen Heart"],
    },
    "proto leon": {
      hp: "12.000.000",
      level: 210,
      drop: ["Proto Claw", "Proto Core", "Proto Crystal"],
    },
    "black knight": {
      hp: "9.500.000",
      level: 190,
      drop: ["Black Knight Armor", "Dark Blade", "Knight's Ring"],
    },
    "ultimate machina": {
      hp: "15.000.000",
      level: 220,
      drop: ["Machina Core", "Ultimate Sword", "Mecha Wing"],
    },
    "evil crystal beast": {
      hp: "5.800.000",
      level: 155,
      drop: ["Crystal Beast Horn", "Dark Gem", "Demon Claw"],
    },
    memecoleous: {
      hp: "3.500.000",
      level: 120,
      drop: ["Meme Shield", "Meme Armor", "Weird Crystal"],
    },
    bexiz: {
      hp: "6.200.000",
      level: 150,
      drop: ["Bexiz Crystal", "Bexiz Orb", "Bexiz Claw"],
    },
    tapir: {
      hp: "4.900.000",
      level: 140,
      drop: ["Tapir Fur", "Tapir Staff", "Mystic Leaf"],
    },
    gwaimol: {
      hp: "8.200.000",
      level: 175,
      drop: ["Gwaimol Horn", "Gwaimol Sword", "Dark Fang"],
    },
    goblin: {
      hp: "1.500.000",
      level: 50,
      drop: ["Goblin Sword", "Goblin Shield", "Goblin Gem"],
    },
    mimic: {
      hp: "2.000.000",
      level: 60,
      drop: ["Mimic Chest", "Mimic Key", "Mimic Gem"],
    },
    skeleton: {
      hp: "1.800.000",
      level: 55,
      drop: ["Skeleton Sword", "Skeleton Shield", "Skeleton Gem"],
    },
    "dark knight": {
      hp: "7.000.000",
      level: 165,
      drop: ["Dark Knight Armor", "Dark Knight Sword", "Dark Knight Ring"],
    },
    golem: {
      hp: "9.000.000",
      level: 185,
      drop: ["Golem Stone", "Golem Core", "Golem Gem"],
    },
    demon: {
      hp: "10.500.000",
      level: 200,
      drop: ["Demon Horn", "Demon Sword", "Demon Shield"],
    },
    dragon: {
      hp: "20.000.000",
      level: 250,
      drop: ["Dragon Scale", "Dragon Claw", "Dragon Gem"],
    },
    phoenix: {
      hp: "18.000.000",
      level: 240,
      drop: ["Phoenix Feather", "Phoenix Flame", "Phoenix Gem"],
    },
    "giant spider": {
      hp: "6.000.000",
      level: 160,
      drop: ["Spider Silk", "Spider Fang", "Spider Gem"],
    },
    "ice golem": {
      hp: "7.500.000",
      level: 175,
      drop: ["Ice Golem Stone", "Ice Golem Core", "Ice Golem Gem"],
    },
    "fire golem": {
      hp: "8.000.000",
      level: 180,
      drop: ["Fire Golem Stone", "Fire Golem Core", "Fire Golem Gem"],
    },
    "lightning golem": {
      hp: "8.500.000",
      level: 185,
      drop: [
        "Lightning Golem Stone",
        "Lightning Golem Core",
        "Lightning Golem Gem",
      ],
    },
    "shadow beast": {
      hp: "9.000.000",
      level: 190,
      drop: ["Shadow Beast Horn", "Shadow Beast Claw", "Shadow Beast Gem"],
    },
    "ancient dragon": {
      hp: "25.000.000",
      level: 300,
      drop: [
        "Ancient Dragon Scale",
        "Ancient Dragon Claw",
        "Ancient Dragon Gem",
      ],
    },
    "soul reaper": {
      hp: "12.000.000",
      level: 220,
      drop: ["Soul Reaper Scythe", "Soul Reaper Cloak", "Soul Reaper Gem"],
    },
    "chaos beast": {
      hp: "15.000.000",
      level: 230,
      drop: ["Chaos Beast Horn", "Chaos Beast Claw", "Chaos Beast Gem"],
    },
    "vampire lord": {
      hp: "14.000.000",
      level: 225,
      drop: ["Vampire Lord Fang", "Vampire Lord Cloak", "Vampire Lord Gem"],
    },
    werewolf: {
      hp: "11.000.000",
      level: 215,
      drop: ["Werewolf Claw", "Werewolf Fur", "Werewolf Gem"],
    },
    "zombie king": {
      hp: "10.000.000",
      level: 210,
      drop: ["Zombie King's Crown", "Zombie King's Sword", "Zombie King's Gem"],
    },
    manticore: {
      hp: "13.000.000",
      level: 220,
      drop: ["Manticore Horn", "Manticore Claw", "Manticore Gem"],
    },
    kraken: {
      hp: "30.000.000",
      level: 300,
      drop: ["Kraken Tentacle", "Kraken Eye", "Kraken Gem"],
    },
    behemoth: {
      hp: "28.000.000",
      level: 290,
      drop: ["Behemoth Horn", "Behemoth Claw", "Behemoth Gem"],
    },
    gorgon: {
      hp: "22.000.000",
      level: 270,
      drop: ["Gorgon Eye", "Gorgon Scale", "Gorgon Gem"],
    },
    hydra: {
      hp: "24.000.000",
      level: 280,
      drop: ["Hydra Scale", "Hydra Fang", "Hydra Gem"],
    },
    minotaur: {
      hp: "19.000.000",
      level: 260,
      drop: ["Minotaur Horn", "Minotaur Axe", "Minotaur Gem"],
    },
    sphinx: {
      hp: "17.000.000",
      level: 250,
      drop: ["Sphinx Riddle", "Sphinx Claw", "Sphinx Gem"],
    },
    cerberus: {
      hp: "20.000.000",
      level: 270,
      drop: ["Cerberus Fang", "Cerberus Fur", "Cerberus Gem"],
    },
    basilisk: {
      hp: "16.000.000",
      level: 240,
      drop: ["Basilisk Scale", "Basilisk Fang", "Basilisk Gem"],
    },
    chimaera: {
      hp: "18.000.000",
      level: 260,
      drop: ["Chimaera Scale", "Chimaera Claw", "Chimaera Gem"],
    },
    griffin: {
      hp: "15.000.000",
      level: 230,
      drop: ["Griffin Feather", "Griffin Claw", "Griffin Gem"],
    },
    phoenix: {
      hp: "18.000.000",
      level: 240,
      drop: ["Phoenix Feather", "Phoenix Flame", "Phoenix Gem"],
    },
  };

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const sender = msg.key.remoteJid;
    const text =
      msg.message.conversation || msg.message.extendedTextMessage?.text || "";
    //if (msg.message.imageMessage) {
    //console.log("📸 Menerima gambar...");

    // Unduh gambar
    //const buffer = await downloadMediaMessage(msg, "buffer");

    // Kirim kembali sebagai stiker
    //await sock.sendMessage(sender, {
    //sticker: buffer,
    //});
    //}

    if (text.toLowerCase().startsWith("send")) {
      const args = text.split(" ");
      const nomorTujuan = args[1]; // Nomor tujuan dari argumen pertama
      const pesan = args.slice(2).join(" "); // Gabungkan pesan yang tersisa

      if (!nomorTujuan || !pesan) {
        await sock.sendMessage(sender, {
          text: "Perintah tidak lengkap. Format: /send nomor pesan",
        });
      } else {
        await sendMessage(sock, nomorTujuan, pesan);
        await sock.sendMessage(sender, {
          text: `Pesan telah dikirim ke ${nomorTujuan}`,
        });
      }
    } else if (text.toLowerCase() === "menu") {
      await sock.sendMessage(sender, {
        image: fs.readFileSync("./anime.jpeg"),
        caption: "1. buff\n2. bosstat\n3. level\n4. cekganteng\n",
      });
    } else if (text.toLowerCase() === "halo") {
      await sock.sendMessage(sender, {
        text: "Halo",
      });
    } else if (text.toLowerCase() === "cekganteng") {
      const hasil = Math.random() < 0.5 ? "ganteng banget" : "kamu gak ganteng";
      await sock.sendMessage(sender, {
        text: `cek kegantengan kamu: ${hasil}`,
      });
    } else if (text.toLowerCase() === "buff") {
      const bufflist = `
        ATK 
        Code : 5010007 Lv 8
        Code : 7170717 Lv 8
        ⊦────────────────▻
        MATK 
        Code : 1021684 Lv 9
        ⊦────────────────▻
        HP 
        Code : 6199999 Lv 10
        Code : 5199999 Lv 10
        Code : 4262222 Lv 10
        ⊦────────────────▻
        AMPR 
        Code : 2010068 Lv 10
        Code : 7088807 Lv 10
        Code : 5010031 Lv 10
        ⊦────────────────▻
        CRITICAL RATE 
        Code : 6065000 Lv 10
        Code : 7162029 Lv 10
        ⊦────────────────▻
        WEAPON ATK 
        Code : 7050301 Lv 10
        Code : 1010810 Lv 10
        ⊦────────────────▻
        STR 
        Code : 1110033 Lv 10
        Code : 1011069 Lv 10
        ⊦────────────────▻
        DEX 
        Code : 4084545 Lv 10
        Code : 1010058 Lv 10
        ⊦────────────────▻
        VIT 
        Code : 5130123 Lv 9
        Code : 2020909 Lv 9
        ⊦────────────────▻
        INT 
        Code : 2020707 Lv 10
        Code : 6061294 Lv 10
        ⊦────────────────▻
        AGI 
        Code : 7162029 Lv 10
        Code : 7162029 Lv 10
        ⊦────────────────▻
        ACCURACY 
        Code : 4261111 Lv 10
        Code : 1010013 Lv 9
        ⊦────────────────▻
        DROP RATE 
        Code : 4196969 Lv 6
        Code : 1010084 Lv 6
        ⊦────────────────▻
        `;
      await sock.sendMessage(sender, {
        image: fs.readFileSync("./anime.jpeg"),
        caption: `${bufflist}`,
      });
    } else if (text.toLowerCase() === "quotes") {
      try {
        const response = await axios.get("https://api.quotable.io/random"); // API random quotes
        const quote = `"${response.data.content}"\n- *${response.data.author}*`;
        await sock.sendMessage(sender, { text: quote });
      } catch (error) {
        console.error("Gagal mengambil kutipan:", error);
        await sock.sendMessage(sender, {
          text: "Maaf, gagal mengambil kutipan 😢",
        });
      }
    } else if (text.toLowerCase() === "stiker") {
      const buffer = await downloadMediaMessage(msg, "buffer");

      // Kirim kembali sebagai stiker
      await sock.sendMessage(sender, {
        sticker: buffer,
      });
    } else if (text.toLowerCase().startsWith("bosstat")) {
      const args = text.split(" ");
      if (args.length < 2) {
        await sock.sendMessage(sender, {
          text:
            "🔍 Gunakan: *bosstat [nama_boss]*\n\nContoh: bosstat venena\n\n📜 Boss tersedia:\n" +
            Object.keys(bossData)
              .map((b) => `- ${b}`)
              .join("\n"),
        });
      } else if (msg.message.imageMessage) {
        console.log("menerima foto");
        const buffer = await downloadMediaMessage(
          msg.message.imageMessage,
          "buffer",
        );
        await sock.sendMessage(sender, {
          sticker: buffer,
        });
      } else {
        const bossName = args.slice(1).join(" ").toLowerCase();
        if (bossData[bossName]) {
          const boss = bossData[bossName];
          await sock.sendMessage(sender, {
            text: `📜 *Boss Stats: ${bossName.toUpperCase()}*\n❤️ HP: ${boss.hp}\n📈 Level: ${boss.level}\n🎁 Drop: ${boss.drop.join(", ")}`,
          });
        } else {
          await sock.sendMessage(sender, {
            text: "❌ Boss tidak ditemukan. Gunakan *bosstat* untuk melihat daftar boss.",
          });
        }
      }
    } else if (text.toLowerCase().startsWith("level")) {
      const args = text.split(" ");
      if (args.length < 2) {
        await sock.sendMessage(sender, {
          text: "🔍 Gunakan: *level [level]*\n\nContoh: level 1\n\n📜",
        });
      } else {
        const levelInput = parseInt(args[1]); // Ambil level yang diminta dan ubah menjadi integer
        const foundSpot = levelingData.find((spot) => {
          const [minLevel, maxLevel] = spot.levelRange.split("-").map(Number);
          return levelInput >= minLevel && levelInput <= maxLevel; // Cek apakah levelInput berada dalam rentang
        });

        if (foundSpot) {
          await sock.sendMessage(sender, {
            text: `*Leveling Spots: ${foundSpot.levelRange}*\nLokasi: ${foundSpot.location}\nMonster: ${foundSpot.monster}`,
          });
        } else {
          await sock.sendMessage(sender, {
            text: "❌ Level tidak ditemukan. Gunakan *level [level]* untuk melihat daftar leveling.",
          });
        }
      }
    } else if (text.toLowerCase().trim().startsWith("ai")) {
      const args = text.trim().split(/\s+/).slice(1).join(" "); // Gabungkan teks setelah "ai"

      if (!args) {
        await sock.sendMessage(sender, {
          text: "Silakan masukkan pertanyaan setelah 'ai'.",
        });
        return;
      }

      async function getGroqChatCompletion() {
        try {
          const response = await groq.chat.completions.create({
            messages: [{ role: "user", content: args }],
            model: "llama-3.3-70b-versatile",
          });
          return response;
        } catch (error) {
          console.error("Error saat mengakses API Groq:", error);
          return null;
        }
      }

      const chatCompletion = await getGroqChatCompletion();
      const msgai =
        chatCompletion?.choices?.[0]?.message?.content ||
        "Maaf, terjadi kesalahan saat memproses permintaan Anda.";

      await sock.sendMessage(sender, { text: msgai });
    } else {
      await sock.sendMessage(sender, { text: `Anda mengirim: "${text}"` });
    }
  });
}

startBot();
