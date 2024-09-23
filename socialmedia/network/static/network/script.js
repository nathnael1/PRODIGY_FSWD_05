
    document.addEventListener('DOMContentLoaded', function() {
     
    
        //sends user to see a person profile
        document.querySelectorAll('.postuser').forEach(element => {
            element.addEventListener("click", (event) => {
                event.preventDefault();
                let username = element.innerHTML
                window.location.href = `profile_view/${username}`    
        });
    });
    //following site
    
    document.querySelectorAll('.followingPage').forEach(element => {
        element.addEventListener('click',(event)=>{
        
            event.preventDefault()
            window.location.href = `following`
    })

    })

    // document.querySelector("#edit").addEventListener('click',()=>{
    //     post_id = document.querySelector("#edit").dataset.post_id
    //    
    // })

    // Getting the original value of number of follower 
    let value = document.querySelector("#followers").innerHTML;
    let number = '';
    for (let i = 0; i < value.length; i++) {
        if (!isNaN(Number(value[i]))) {
            number += value[i];
        }
    }
    let numberoriginal = parseInt(number, 10);




    //follow and unfollow function
    let followb = true
    let followbutton = document.querySelector("#follow")
    let unfollowbutton = document.querySelector("#unfollow")
    function follow(user){
        console.log(user)
        if (followb){
            followbutton = document.querySelector("#follow")
            fetch(`/follow/${user}`, {
                method: 'PUT'
            })
            .then(response => response.json())
            .then(result => {

                //increment follower by 1
                let value = document.querySelector("#followers").innerHTML;
                let number = '';
                for (let i = 0; i < value.length; i++) {
                    if (!isNaN(Number(value[i]))) {
                        number += value[i];
                    }
                }
                number = parseInt(number, 10);
                if (number <= numberoriginal){
                    number++
                    document.querySelector('#followers').innerHTML = `Followers: ${number}`
                }else{
                    document.querySelector('#followers').innerHTML = `Followers: ${number}`
                }
                


                document.querySelector('#follow').innerHTML = 'Unfollow'
                document.querySelector('#follow').id = 'unfollow'
                unfollowbutton = document.querySelector("#unfollow")
                unfollowbutton.disabled = false;
                document.querySelector("#unfollow").addEventListener('click',()=>{
                    document.querySelector('#unfollow').dataset.user = user
                    followb= false
                    follow(user)
                })
                
                
            })
            .catch(error => console.log('error', error)
        )
        }else{

            fetch(`/unfollow/${user}`, {
                method: 'PUT'
            })
            .then(response => response.json())
            .then(result => {


                //decrement follower number by 1 
                let value = document.querySelector("#followers").innerHTML;
                let number = '';
                for (let i = 0; i < value.length; i++) {
                    if (!isNaN(Number(value[i]))) {
                        number += value[i];
                    }
                }
                number = parseInt(number, 10);
                if (number >= numberoriginal){
                    number--
                    document.querySelector('#followers').innerHTML = `Followers: ${number}`
                }else{
                    document.querySelector('#followers').innerHTML = `Followers: ${number}`
                }



                document.querySelector('#unfollow').innerHTML = 'Follow'
                document.querySelector('#unfollow').id = 'follow'
                followbutton = document.querySelector("#follow")
                followbutton.disabled = false;
                document.querySelector("#follow").addEventListener('click',()=>{
                document.querySelector('#follow').dataset.user = user
                followb = true
                follow(user)
            })
                

            })
            .catch(error => console.log('error', error)
        )
        }

    }



    // to follow and unfollow
    if (followbutton){
        document.querySelector('#follow').addEventListener('click', () => {
            followb = true
            let encodedUser = document.querySelector('#follow').dataset.user
            let user = decodeURIComponent(encodedUser);

            document.querySelector('#follow').disabled = true
            follow(user)
            
    
        })
    }
    if(unfollowbutton){
        document.querySelector('#unfollow').addEventListener('click', () => {
            let encodedUser = document.querySelector('#unfollow').dataset.user
            let user = decodeURIComponent(encodedUser);
            document.querySelector('#unfollow').disabled = true
            followb = false
            follow(user)
    
        })
    }




    })
