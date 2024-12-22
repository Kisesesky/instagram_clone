this.addEventListener('DOMContentLoaded',()=>{
    const uploadElement = document.getElementById('upload')
    const imageElement = document.getElementById('profile-img')
    const uploadModalElement = document.getElementById('uploadModal')
    const updateElement = document.getElementById('update-profile-btn')
    const saveElement = document.getElementById('save')
    const closeElement = document.getElementById('close')
    const imagePreviewElement = document.getElementById('imagePreview')

    const modalIdElement = document.getElementById('id')
    const modalnameElement = document.getElementById('name')
    const modalWebsiteElement = document.getElementById('website')
    const modalProfileElement = document.getElementById('profileIdx')

    const profileIdElement = document.getElementById('profile-id')
    const profileNameElement = document.getElementById('profile-name')
    const profileWebsiteElement = document.getElementById('profile_website')
    const profileDescriptionElement = document.getElementById('profile-description')
    
    //postElement
    const postBtnElement = document.getElementById('postBtn');
    const postUploadElement = document.getElementById('postUpload');
    const postModalElement = document.getElementById('postModal');
    const postImageElement = document.getElementById('postImage')
    const postImagePreviewElement = document.getElementById('postImagePreview');
    const postTextElement = document.getElementById('postText');
    const shareElement = document.getElementById('share');
    const close2Element = document.getElementById('close2');
    const postUploadBtnElement = document.getElementById('postUploadBtn')
    const PostModalPageElement = document.getElementById('PostModalPage');
    const postGetElement = document.getElementById('postGet')
    const postsGalleryElement = document.getElementsByClassName('posts__gallery')

    function saveImageToLocalStorage(data){
        localStorage.setItem('image',data)
        imageElement.src=data;
    }

    function loadImageToLocalStorage(){
        const image = localStorage.getItem('image');
        if(image){
            imageElement.src = image;
            imagePreviewElement.src = image;
        }
    }
    function loadModalValue(){
        modalIdElement.value = profileIdElement.textContent;
        modalnameElement.value = profileNameElement.textContent;
        modalWebsiteElement.value = profileWebsiteElement.textContent;
        modalProfileElement.value = profileDescriptionElement.textContent;
    }

    function saveProfileToLocalStorage(){
        const profileData = {
            id : modalIdElement.value,
            name: modalnameElement.value,
            website: modalWebsiteElement.value,
            description: modalProfileElement.value
        };
        localStorage.setItem('profileData',JSON.stringify(profileData));
    }

    function loadProfileToLocalStorage(){
        const profileData = JSON.parse(localStorage.getItem('profileData'));
        if(profileData) {
            profileIdElement.textContent = profileData.id;
            profileNameElement.textContent = profileData.name;
            profileWebsiteElement.textContent = profileData.website;
            profileDescriptionElement.textContent = profileData.description;

            modalIdElement.value = profileData.id;
            modalnameElement.value = profileData.name;
            modalWebsiteElement.value = profileData.website;
            modalProfileElement.value = profileData.description;
        } else{
            profileIdElement.textContent = ''
            profileNameElement.textContent = ''
            profileWebsiteElement.textContent ='' 
            profileDescriptionElement.textContent = ''

            modalIdElement.value = ''
            modalnameElement.value = ''
            modalWebsiteElement.value = ''
            modalProfileElement.value = ''

        }
    }

    

    saveElement.addEventListener('click',()=>{
        if(imagePreview.src){
            saveImageToLocalStorage(imagePreviewElement.src);
            saveProfileToLocalStorage();            
            uploadElement.close();
        }
    })
    

    //close클릭 및 esc
    window.addEventListener('keydown', (e)=>{
        if(e.key ==='Escape'){
            uploadModalElement.close();
        }
    })
    closeElement.addEventListener('click',(e)=>{
        uploadModalElement.close();
    })

    //프로필 편집 모달
    updateElement.addEventListener('click',()=>{
        loadModalValue();
        loadProfileToLocalStorage();
        uploadModalElement.showModal();
    })
    imagePreviewElement.addEventListener('click',()=>{
        uploadElement.click();
    })
    

    uploadElement.addEventListener('change',(e)=>{
        const file = e.target.files[0];
        if(file){
            const reader = new FileReader()
            reader.onload = function(e){
                const imageData = e.target.result;
                imagePreviewElement.src = imageData;
                
            }
            reader.readAsDataURL(file)
        }
    })

    //post Modal open,close
    postBtnElement.addEventListener('click',()=>{
        postGetElement.style.display = 'none';
                shareElement.style.display = 'none';
                PostModalPageElement.style.display = 'block';
        postModalElement.showModal();
    })
    postUploadBtn.addEventListener('click',()=>{
        postUploadElement.click();
    })
    window.addEventListener('keydown', (e)=>{
        if(e.key ==='Escape'){
            postModalElement.close();
        }
    })
    close2Element.addEventListener('click',(e)=>{
        postModalElement.close();
    })

    //post function
    function saveImageToLocalStoragePost(data){
        localStorage.setItem('image',data)
        postImageElement.src=data;
    }

    function loadImageToLocalStoragePost(){
        const image = localStorage.getItem('image');
        if(image){
            postImageElement.src = image;
            postImagePreviewElement.src = image;
        }
    }
    function createPost(image, text) {
        const posts = JSON.parse(localStorage.getItem("posts")) || []; 
        const newPost = {
            id: posts.length ? posts[posts.length - 1].id + 1 : 1,
            image, 
            text,
            likes: 0,
            comments: 0
        };
    
        posts.push(newPost);
        localStorage.setItem("posts", JSON.stringify(posts));
        updatePostsUI();
    }
    
    function updatePostsUI() {
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        const postsGallery = document.querySelector(".posts__gallery");
   
        postsGallery.innerHTML = "";
   
        if (posts.length === 0) {
            postsGallery.style.display = 'flex';
            postsGallery.innerHTML = `<div class="posts_item">
                            <div class="posts_img">
                                <img src="https://elice-contents.github.io/elice-instagram-clone/assets/camera_icon.svg" alt="camera">
                            </div>
                            <h3>게시물 없음</h3>
                        </div>`;
            return;
        }
   
        posts.forEach((post) => {
            const postElement = document.createElement("div");
            postElement.classList.add("posts_item2");
            postsGallery.style.display = 'grid';
            postsGallery.style.gridTemplateColumns = 'repeat(3, 1fr)';
            postElement.innerHTML = `<div class="post" id="post-${post.id}">
                <img src="${post.image}" alt="post-${post.id}" />
                <dialog class="posteditmodal">
                    <form method="dialog">
                        <img
                            class="modal__image"
                            src="${post.image}"
                            alt="post-${post.id}"
                        />
                        <div class="posteditmodal__update">
                            <textarea class="posteditmodal__textarea" placeholder="여기에 수정할 내용을 작성하세요.">${post.text}</textarea>
                            <div class="posteditmodal__update-buttons">
                                <button class="posteditmodal__update-submit-button">수정</button>
                                <button class="posteditmodal__update-cancel-button">취소</button>
                            </div>
                        </div>
    
                        <div class="posteditmodal__buttons">
                            <button class="posteditmodal__button posteditmodal__update-button">
                                <img src="https://elice-contents.github.io/elice-instagram-clone/assets/edit_icon.svg" alt="edit_icon" />
                            </button>
                            <button class="posteditmodal__button posteditmodal__delete-button"> 
                                <img
                                    src="https://elice-contents.github.io/elice-instagram-clone/assets/trashcan_icon.svg"
                                    alt="trashcan_icon"
                                />
                            </button>
                        </div>
    
                        <button class="modal__close-button">
                            <img src="https://elice-contents.github.io/elice-instagram-clone/assets/close_icon.svg" alt="close_icon" />
                        </button>
                    </form>
                </dialog>
            </div>`;
            postsGallery.appendChild(postElement);
        });
   
        document.querySelectorAll('.posteditmodal__update-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const postElement = e.target.closest('.post');
                const modal = postElement.querySelector('.posteditmodal');
                modal.showModal();
            });
        });
   
        document.querySelectorAll('.modal__close-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const modal = e.target.closest('.posteditmodal');
                modal.close();
            });
        });
        Array.from(postsGalleryElement).forEach(gallery => {
            gallery.addEventListener('click', (e) => {
                if (e.target.tagName === 'IMG') { 
                    const postElement = e.target.closest('.post');
                    const modal = postElement.querySelector('.posteditmodal');
                    modal.showModal();
                }
            });
        });
    }
   

    function deletePost(id) {
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        const updatedPosts = posts.filter((post) => post.id !== id);
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
        updatePostsUI();
    };

    shareElement.addEventListener('click', () => {
        const imageData = postImagePreviewElement.src;
        const textdata = postTextElement.value;
        if (imageData && textdata) {
            createPost(imageData, textdata);
        }
        postModalElement.close();
    });

   
    

    //post Modal
    postUploadElement.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageData = e.target.result;
                postImagePreviewElement.src = imageData;
                localStorage.setItem('postImage', imageData);
    
                postGetElement.style.display = 'block';
                shareElement.style.display = 'block';
                PostModalPageElement.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });
    
        



    loadImageToLocalStorage();
    loadProfileToLocalStorage();
    loadImageToLocalStoragePost();
    updatePostsUI();


});