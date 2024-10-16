//Base
import Navbar from './Base/Navbar/Navbar'
import SidePanel from './Base/SidePanel/SidePanel'
//Pages
import Home from './Pages/Home/Home'
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
import Profile from './Pages/Profile/Profile';
import ForumMain from './Pages/Forum/ForumMain/ForumMain';
import CreateThread from './Pages/Forum/CreateThread/CreateThread';
import Admin from './Pages/Admin/Admin';
import Grade from './Pages/Grade/Grade';
import Category from './Pages/Category/Category';
import Thread from './Pages/Forum/Thread/Thread';
import User from './Pages/User/User';
import Role from './Pages/Role/Role';
//Components
import Navlink from './Components/Navlink/Navlink';
import Button from './Components/Button/Button';
import Input from './Components/Input/Input';
import Dropdown from './Components/Dropdown/Dropdown';
import ThreadPost from './Components/ThreadPost/ThreadPost';
import EditableTable from './Components/EditableTable/EditableTable';
import Comment from './Components/Comment/Comment';
//API
import ApiPaths from './Api/ApiPaths';
import {getRequest, putRequest, deleteRequest, postRequest, patchRequest} from './Api/ApiResp'
//Utility
import { validateSignUpForm, initialRegisterFormState, initialLoginFormState, validatePostForm, initialPostFormState } from './Utility/FormValidation';
import LoadableComponent from './Utility/LoadableComponent';
//Panels
import PageHeaderPanel from './Panels/PageHeaderPanel/PageHeaderPanel';
import Loading from './Panels/Loading/Loading';

const EndPoint = {
  "path":{
    "SignIn" : "/signin",
    "SignUp" : "/signup",
    "Profile" : "/profile",
    "Home" : "/home",
    "ForumMain":"/forummain",
    "CreateThread":"/forummain/createthread",
    "Thread": "/forummain/thread/:id",
    ThreadById:(id) => `/forummain/thread/${id}`,
    "Admin":"/admin",
    "Grade":"/admin/grade",
    "Category":"/admin/category",
    "User":"/admin/users",
    "Role":"/admin/roles"
  },
  "base":{
    Navbar, SidePanel
  },
  "pages":{
    Home, SignIn, SignUp, Profile, ForumMain, CreateThread, Admin, Grade, Category, Thread, User, Role
  },
  "components":{
    Navlink, Button, Input, Dropdown, ThreadPost, EditableTable, Comment
  },
  "Utility":{
    "FormValidation":{
        validateSignUpForm, initialRegisterFormState, initialLoginFormState, validatePostForm, initialPostFormState
    },
    "Other": {
      LoadableComponent
    }
  },
  "Api": {
    getRequest, putRequest, deleteRequest, postRequest, ApiPaths, patchRequest
  },
  "panels": {
    PageHeaderPanel, Loading
  }
};

export default EndPoint;