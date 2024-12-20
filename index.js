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

    shareElement.addEventListener('click',()=>{
        if(postImagePreviewElement.src){
            saveImageToLocalStoragePost(postImagePreviewElement.src);
            postModalElement.close();
        }
    })
    

    //post Modal
    postUploadElement.addEventListener('change',(e)=>{
        const file = e.target.files[0];
        if(file){
            const reader = new FileReader()
            reader.onload = function(e){
            const imageData = e.target.result;
            postImagePreviewElement.src = imageData;

            postGetElement.style.display = 'block'
            shareElement.style.display ='block'
            PostModalPageElement.style.display = 'none'
        }
        reader.readAsDataURL(file);
        }
        
    })
        



    loadImageToLocalStorage();
    loadProfileToLocalStorage();
    loadImageToLocalStoragePost();


})