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
        createdAt: serverTimestamp()  // Server-side timestamp
    };

    // Add the new post to Firestore
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

        // Load replies (stored in subcollection)
        loadReplies(docSnapshot.id);

        // Set up event delegation for reply buttons
        postsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('reply-btn')) {
                const postId = event.target.getAttribute('data-post-id');
                addReply(postId);  // Call addReply function with the post ID
            }
        });

    });
}


// Function to load replies for a post
async function loadReplies(postId) {
    const repliesContainer = document.getElementById(`replies-${postId}`);
    repliesContainer.innerHTML = ''; // Clear existing replies

    const repliesSnapshot = await getDocs(collection(db, 'posts', postId, 'replies'));
    repliesSnapshot.forEach(replyDoc => {
        const reply = replyDoc.data();
        const replyDiv = document.createElement('div');
        replyDiv.classList.add('reply');
        replyDiv.innerHTML = `<p><strong>${reply.anonymousName}:</strong> ${reply.content}</p>`;
        repliesContainer.appendChild(replyDiv);
    });
}

// Function to add a reply to a post
window.addReply = async function(postId) {  // Attach to window
    const replyContent = document.getElementById(`reply-${postId}`).value;
    if (replyContent.trim() === '') return; // Don't allow empty replies

    const anonymousName = `User${Math.floor(Math.random() * 10000)}`; // Generate anonymous name
    const reply = { anonymousName, content: replyContent, createdAt: serverTimestamp() };

    // Add the reply to the post's replies subcollection
    await addDoc(collection(db, 'posts', postId, 'replies'), reply);

    document.getElementById(`reply-${postId}`).value = ''; // Clear the reply textarea
    loadReplies(postId);  // Reload replies to show the new reply
};

// Handle post button click
document.getElementById('post-btn').addEventListener('click', () => {
    const content = document.getElementById('post-content').value;
    if (content.trim()) {
        createPost(content);
        document.getElementById('post-content').value = ''; // Clear the textarea
    }
});

// Load posts when the page loads
window.onload = loadPosts;