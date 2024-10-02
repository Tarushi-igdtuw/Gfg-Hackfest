/*
import { db } from './firebaseConfig.js';
import { 
    collection, addDoc, getDocs, serverTimestamp, query, orderBy 
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

// For creating a new post
async function createPost(content) {
    const anonymousName = `User${Math.floor(Math.random() * 10000)}`;
    const post = {
        anonymousName,
        content,
        createdAt: serverTimestamp(),
    };

    await addDoc(collection(db, 'posts'), post);
    loadPosts();
}

// Load posts from Firestore 
async function loadPosts() {
    const postsDiv = document.getElementById('posts'); 
    postsDiv.innerHTML = ''; // Clear previous posts

    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
        const post = doc.data();
        const postDiv = document.createElement('div');
        postDiv.innerHTML = `<p><strong>${post.anonymousName}:</strong> ${post.content}</p>`;
        postsDiv.appendChild(postDiv);
    });
}

// Handle post button click
document.getElementById('post-btn').addEventListener('click', () => {
    const content = document.getElementById('post-content').value;
    createPost(content);
});

// Load posts on page load
window.onload = loadPosts;
*/




// forum.js
import { db } from './firebaseConfig.js';
import { 
    collection, addDoc, getDocs, doc, updateDoc, serverTimestamp, query, orderBy 
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

// Function to create a new post
async function createPost(content) {
    const anonymousName = `User${Math.floor(Math.random() * 10000)}`;
    const post = {
        anonymousName,
        content,
        createdAt: serverTimestamp(),
        replies: []  // Array to store replies
    };

    await addDoc(collection(db, 'posts'), post);
    loadPosts();  // Reload posts after creating a new one
}

// Function to load posts from Firestore
async function loadPosts() {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = ''; // Clear existing posts

    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(docSnapshot => {
        const post = docSnapshot.data();
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <p><strong>${post.anonymousName}:</strong> ${post.content}</p>
            <div id="replies-${docSnapshot.id}" class="replies"></div>
            <textarea id="reply-${docSnapshot.id}" placeholder="Reply..." rows="2"></textarea>
            <button onclick="addReply('${docSnapshot.id}')">Reply</button>
        `;
        postsContainer.appendChild(postDiv);

        // Load replies
        post.replies.forEach(reply => {
            const replyDiv = document.createElement('div');
            replyDiv.classList.add('reply');
            replyDiv.innerHTML = `<p><strong>${reply.anonymousName}:</strong> ${reply.content}</p>`;
            document.getElementById(`replies-${docSnapshot.id}`).appendChild(replyDiv);
        });
    });
}

// Function to add a reply to a post
async function addReply(postId) {
    const replyContent = document.getElementById(`reply-${postId}`).value;
    const anonymousName = `User${Math.floor(Math.random() * 10000)}`;
    const reply = { anonymousName, content: replyContent };

    const postRef = doc(db, 'posts', postId);
    const postSnapshot = await postRef.get();
    const post = postSnapshot.data();

    const updatedReplies = [...post.replies, reply];
    await updateDoc(postRef, { replies: updatedReplies });

    loadPosts();  // Reload posts to show the new reply
}

// Handle post button click
document.getElementById('post-btn').addEventListener('click', () => {
    const content = document.getElementById('post-content').value;
    createPost(content);
});

// Load posts when the page loads
window.onload = loadPosts;
