/* Add your Application JavaScript */

Vue.component('app-header',{
  template:`
      <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
              <a class="navbar-brand" href="#">Photogram</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                    <router-link to="/" class="nav-link">Home</router-link>
                  </li>
                  <li class="nav-item active">
                    <router-link to="/explore" class="nav-link">Explore</router-link>
                  </li>
                  <li class="nav-item active">
                    <router-link to="/users/{user_id}" class="nav-link">My Profile</router-link>
                  </li>
                  <li class="nav-item active">
                    <router-link to="/logout" class="nav-link">Logout</router-link>
                  </li>
                </ul>
              </div>
            </nav>
      </header>
  `,
  data: function() {
    return {};
  }
});

const Home = Vue.component('home',{
  template:`
    <div class="flex-container">

      <div class="login-image border-gray">
        <img src="/static/assets/landscape.jpg" alt="landsape" class="home-img">
      </div>

      <div class="photogram-login-card box-shadow border-gray">
        <div class="login-title flex-row justify-center border-bottom">
          <h2>Photogram</h2>
        </div>

        <div class="login-desc">
          <p>share photos of your favourite moments with your friends and family</p>
        </div>

        <div class="login-buttons flex-row justify-space-around">
          <router-link to= "/register" tag= "button" type="button" class="btn btn-success">Register</router-link>
          <router-link to= "/login" tag= "button" type="button" class="btn btn-primary">Login</button></router-link>
        </div>
      </div>

    </div>
  `,
  data: function(){
    return {}
  }
});

const Register = Vue.component('register',{
  template:`
  <div class = "form-container">

    <div class = "content-holder width-100">

      <!--Heading-->
      <div class="flex-container">
        <div class="header">
          <h1>Register</h1>
        </div>
      </div>


      <!--Form-->
      <div class="form-container">
        <div class="form-container">
            <form @submit.prevent="upload" id="uploadForm" class = "register-form border-gray box-shadow" action ='' enctype= "multipart/form-data">
              <input type="hidden" name="csrf_token" :value="csrf"/>
              <label class = "form-control-label">
              Username
              </label>
              <input type="text" name="username" class = "form-control"></input>

              <label class = "form-control-label">
              Password
              </label>
              <input type="password" name="password" class = "form-control"></input>

              <label class = "form-control-label">
              Firstname
              </label>
              <input type="text" name="firstname" class = "form-control"></input>

              <label class = "form-control-label">
              Lastname
              </label>
              <input type="text" name="lastname" class = "form-control"></input>

              <label class = "form-control-label">
              Email
              </label>
              <input type="text" name="email" class = "form-control"></input>

              <label class = "form-control-label">
              Location
              </label>
              <input type="text" name="location" class = "form-control"></input>

              <label class = "form-control-label">
              Biography
              </label>
              <textarea name="biography" rows="3" cols = "10" class = "form-control"></textarea>

              <label class="form-control-label">
              Photo
              </label>
              <input type="file" name="photo"></input>

              <button type="submit" name="register" class="btn btn-success form-control margin-top-30">Register</button>

            </form>
        </div>
      </div>

    </div>

  </div>
  `,
  data: function(){
    return {
      csrf: token
    }
  },

  methods: {

    upload: function(){

      let uploadForm = document.getElementById('uploadForm');
      let form_data = new FormData(uploadForm);

      fetch("/api/users/register",{
        method: 'POST',
        body: form_data,
        headers: {
         'X-CSRFToken': token
        },
        credentials: 'same-origin'
      })
      .then(function(response){
        return response.json();
      })
      .then(function(jsonResponse){
        console.log(jsonResponse);
      })
      .catch(function(error){
        console.log(error);
      });
    },


  }
});

const Login = Vue.component('login',{
  template:`
  <div class = "form-container">

    <div class = "content-holder width-100">

      <!--Heading-->
      <div class="flex-container">
        <div class="header">
          <h1>Login</h1>
        </div>
      </div>


      <!--Form-->
      <div class="form-container">
        <div class="form-container">
            <form @submit.prevent="upload" id="uploadForm" class = "register-form border-gray box-shadow" action ='' enctype= "multipart/form-data">
              <input type="hidden" name="csrf_token" :value="csrf"/>
              <label class = "form-control-label">
              Username
              </label>
              <input type="text" name= "username"class = "form-control"></input>

              <label class = "form-control-label">
              Password
              </label>
              <input type="password" name="password" class = "form-control"></input>

              <input type="submit" class="btn btn-success form-control margin-top-30" value="Login"></input>

            </form>
        </div>
      </div>

    </div>

  </div>
  `,
  data: function (){
    return {
      csrf: token
    }
  },

  methods:{
    upload: function(){
      let uploadForm = document.getElementById('uploadForm');
      let formData = new FormData(uploadForm);

      fetch('/api/auth/login',{
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': token
        },
        credentials: 'same-origin'
      })
        .then(function(response){
          return response.json();
        })
        .then(function(jsonResponse){
          console.log(jsonResponse);
          if("token" in jsonResponse){
            let jwt_token = jsonResponse.token;
            let user_id = jsonResponse.user_id;
            sessionStorage.setItem('jwt_token',jwt_token);
            sessionStorage.setItem('user_id',user_id);
            router.push("/explore");
          }
          //Add else here for when login fails
        })
        .catch(function(error){
          console.log(error)
        });
    }
  }

});

const Logout = Vue.component('logout',{
  template:`

  `,
  data: function (){
    return {}
  },
  methods:{
    logout: function(){
      fetch('/api/auth/logout',{
        headers:{
          'Authorization' : 'Bearer '+ sessionStorage.getItem('jwt_token')
        }
      })
      .then(function(response){
        return response.json();
      })
      .then(function(jsonResponse){
        console.log(jsonResponse);
      })
      .catch(function(error){
        console.log(error);
      });
    }
  },
  created: function(){
    fetch('/api/auth/logout',{
      headers:{
        'Authorization' : 'Bearer '+ sessionStorage.getItem('jwt_token')
      }
    })
    .then(function(response){
      return response.json();
    })
    .then(function(jsonResponse){
      console.log(jsonResponse);
      sessionStorage.clear();
      router.push('/login');
    })
    .catch(function(error){
      console.log(error);
    });
  }
});

const Explore = Vue.component('explore',{
  template:`
    <div class="post-container">

      <div class="flex-container flex-column width70">

        <div v-for="post in posts" class="posts border-gray box-shadow">

          <div class="post-head">

            <div class="post-profile-picture">
              <img v-bind:src="post.profile_picture" alt=""></img>
            </div>

            <div class="post-username">
              <router-link to="/users/{user_id}" tag="a">{{ post.user }}</router-link>
            </div>

          </div>

          <div class="post-image">
            <img v-bind:src="post.photo" alt=""></img>
          </div>

          <div class="post-caption">
            <p>{{ post.caption }}</p>
          </div>

          <div class="post-foot">
            <div class="likes">
              <img src="/static/assets/not-liked.png" alt="heart"></img>
              <p>{{ post.likes }} Likes</p>
            </div>

            <div class="date">
              <p>{{ post.created_on }}</p>
            </div>

          </div>

        </div>

      </div>

      <div class="button-post">
        <router-link to="/posts/new" type="button" tag="button" class="btn btn-primary">New Post</router-link>
      </div>
    </div>
  `,
  data: function (){
    return {
      posts:[]

    }
  },
  created: function(){
    let self = this
    fetch('/api/posts',{
      headers:{
        'Authorization' : 'Bearer '+ sessionStorage.getItem('jwt_token')
      }
    })
    .then(function(response){
      return response.json();
    })
    .then(function(jsonResponse){
      console.log(jsonResponse.posts[0]);
      if("posts" in jsonResponse){
        self.posts = jsonResponse.posts;
      }
    })
    .catch(function(error){
      console.log(error);
    });
  }

});

const ViewUser = Vue.component('viewuser',{
  template:`

  <div class="main-container flex-column">
    <div class="profile-conatiner">
      <img src="# alt=""></img>

      <div class="profile-info">
        <div><h4>Name</h4></div>

        <div><p>Location</p></br><p>Date</p></div>

        <div>Bio</div>

      </div>

      <div class="follow-container">
        <div class="flex-row">
          <div class="flex-column">
            <div><h4>6</h4></div>
            <div><p>Posts</p></div>
          </div>

          <div class="flex-column">
            <div><h4>10</h4></div>
            <div><p>Followers</p></div>
          </div>
        </div>

        <button class="btn btn-primary" type="button" value="Follow"></button>

      </div>
    </div>

    <div class="photos-container">
    </div>

  </div>

  `,
  data: function (){
    return {}
  }
});

const Post = Vue.component('post',{
  template:`
  <div class = "form-container">

    <div class = "content-holder width-100">

      <!--Heading-->
      <div class="flex-container">
        <div class="header">
          <h1>New Post</h1>
        </div>
      </div>


      <!--Form-->
      <div class="form-container">
        <div class="form-container">
            <form @submit.prevent="makePost" id="postForm" class = "register-form border-gray box-shadow" action ='' method = "POST" enctype= "multipart/form-data">
              <label class="form-control-label">
              Photo
              </label>
              <input name="photo" type="file"></input>

              <label class = "form-control-label">
              Caption
              </label>
              <textarea name="caption" rows="3" cols = "10" class = "form-control"></textarea>

              <button type="submit" name="submit" class="btn btn-success form-control margin-top-30">Submit</button>

            </form>
        </div>
      </div>

    </div>

  </div>
  `,
  data: function (){
    return {

    }
  },
  methods:{
    makePost: function(){
      let form = document.getElementById('postForm');
      let form_data = new FormData(form);

      fetch('/api/users/'+sessionStorage.getItem('user_id')+'/posts',{
        method: 'POST',
        body: form_data,
        headers: {
          'X-CSRFToken': token,
          'Authorization': 'Bearer '+ sessionStorage.getItem('jwt_token')
        },
        credentials: 'same-origin'
      })
      .then(function(response){
        return response.json();
      })
      .then(function(jsonResponse){
        console.log(jsonResponse);
        if("message" in jsonResponse){
          router.push('/explore')
        }
      })
      .catch(function(error){
        console.log(error);
      });
    }
  },
});



const router = new VueRouter({
  mode: 'history',
  routes: [
      { path: '/', component: Home },
      { path: '/register', component: Register },
      { path: '/login', component: Login },
      { path: '/logout', component: Logout },
      { path: '/explore', component: Explore },
      { path: '/users/{user_id}', component: ViewUser },
      { path: '/posts/new', component: Post }
  ]
});

const app = new Vue({
  el: '#photogram',
  router
})
