# 💬 simple_websockets_chat

A basic real-time chat application built with **Node.js**, **Express**, and **Socket.IO**. This project is a good foundation for building more advanced chat apps using WebSockets.

---

## 🚀 Features

- Join with a nickname
- Real-time messaging
- Typing indicators
- Join/leave system messages
- Live user list
- Simple, responsive UI

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/simple_websockets_chat.git
cd simple_websockets_chat
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to try it out.

---

## 🧠 How It Works

The app uses **Socket.IO** to create persistent connections between clients and the server. Here's the process:

- Users are prompted for a nickname and added to a live user list.
- Messages are sent and received in real-time.
- When users type, a "typing..." status is shown to others.
- Users joining or leaving triggers a system message.
- The frontend updates dynamically with all chat and status changes.

---

## 🧱 Build On This

This project is ideal for beginners learning about WebSockets and real-time communication. You can extend it with features like:

- User authentication
- Chat rooms or private messaging
- Message history with database storage
- Emojis, themes, or file sharing

---

## 📄 License

This project is licensed under the [MIT License](LICENSE.txt).