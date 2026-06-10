
// const likePost = async(post_id)=>{

//   const result = await fetch(`/like/${post_id}`,{
//     method:"POST"
//   });

//   const data = await result.json();

//   const likeCount = document.querySelector(
//     `#count-${post_id}`
//   );

//   likeCount.innerText =
//   Number(likeCount.innerText) + data.val;

// }
// let allHeard = document.querySelectorAll(".fa-heart");
// console.log(allHeard);
async function likePost(post_id){

  const res = await fetch(`/like/${post_id}`,{
    method:"POST"
  });

  const data = await res.json();

  const count = document.querySelector(`#count-${post_id}`);

  count.innerText = data.totalLikes;

  const icon = document.querySelector(`[onclick="likePost(${post_id})"]`);

  if(data.liked){
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid");
  }else{
    icon.classList.remove("fa-solid");
    icon.classList.add("fa-regular");
  }
}
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()