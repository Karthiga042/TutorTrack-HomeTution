import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Pages/Login';
import Login1 from './Pages/Login1';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Courses from './Components/Courses/Courses';
import Home from './Pages/Home';
import Footer from './Components/Footer/Footer';
import Privacy from './Components/Privacy/Privacy';
import Signup from './Pages/Signup';
import BecomeTutor from './Components/BecomeTutor/BecomeTutor';
import RequestTutor from './Components/RequestTutor/RequestTutor';
import TopCities from './Components/TopCities/TopCities';
import CityCard from './Components/TopCities/CityCard';
import CourseDescription from './Components/Courses/CourseDescription';
import TopCitiesDescription from './Components/TopCities/TopCitiesDescription';
import HelpCenter from './Components/Help/HelpCenter';
import CardComponent from './Components/Help/CardComponent';
import Learner from "./Components/Help/Learner";
import Teacher from "./Components/Help/Teacher";
import StaffDetails from './Components/StaffDetails/StaffDetails';
import StaffDetail from './Components/StaffDetails/StaffDetail';
import SearchBar from "./Components/SearchBar/SearchBar";
import ContactUs from './Components/ContactUs/ContactUs';
import AboutUs from "./Components/AboutUs/AboutUs";
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import StaffPage from './Components/AdminDashboard/StaffPage';
import StudentPage from './Components/AdminDashboard/StudentPage';
import CoursesPage from './Components/AdminDashboard/CoursesPage';
import Payment from './Components/Payment/Payment';
import ConfirmationPage from './Components/ConfirmationPage/ConfirmationPage';
import RegisteredStaff from './Components/AdminDashboard/RegisteredStaff';
import RegisteredStudents from './Components/AdminDashboard/RegisteredStudents';
import RegisteredCourses from './Components/AdminDashboard/RegisteredCourses';
import AvailableCourses from './Components/AdminDashboard/AvailableCourses';
import FeedbacksReceived from './Components/AdminDashboard/FeedbacksReceived';
import FeedbackManagement from './Components/AdminDashboard/FeedbackManagement';
import StaffChart from './Components/AdminDashboard/StaffChart';
import StudentChart from './Components/AdminDashboard/StudentChart';
import CourseChart from './Components/AdminDashboard/CourseChart';
import FeedbackForm from './Components/FeedbackForm/FeedbackForm';
import BecomeTutor2 from './Components/BecomeTutor2/BecomeTutor2';
import StaffConfirmation from './Components/StaffConfirmation/StaffConfirmation';
import PaymentManagement from './Components/AdminDashboard/PaymentManagement';
import StudentsCount from './Components/AdminDashboard/StudentsCount';
import PaymentCount from './Components/AdminDashboard/PaymentCount';
import FeedbackCount from './Components/AdminDashboard/FeedbackCount';
import StaffCount from './Components/AdminDashboard/StaffCount';
import CourseCount from './Components/AdminDashboard/CourseCount';
import BecomeTutorManagement from './Components/AdminDashboard/BecomeTutorManagement';
import RequestTutorManagement from './Components/AdminDashboard/RequestTutorManagment';
import RequestTutorCount from './Components/AdminDashboard/RequestTutorCount';
import BecomeTutorCount from './Components/AdminDashboard/BecomeTutorCount';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import Profile from './Components/Profile/Profile';
import CourseBooking from './Components/AdminDashboard/CourseBooking';

function App() {
  return (
    <div>
      <BrowserRouter>
      <ScrollToTop/>
        <Routes>
          <Route path='/navbar' element={<Navbar />}/>
          <Route path='/' element={<Home />}/>
          <Route path='/searchbar' element={<SearchBar/>}/>
          <Route path='/courses' element={<Courses />}/>
          <Route path='/coursedescription' element={<CourseDescription />}/>

          <Route path='/privacy' element={<Privacy />}/>

          <Route path="/product/:productId" element={<Product />} />
          <Route path="/shopcategory/:category" element={<ShopCategory />} />

          <Route exact path='/becomeatutor' element={<BecomeTutor />}/>
          <Route path='/becometutor2' element={<BecomeTutor2/>}/>

          <Route path='/login' element={<Login />}/>
          <Route path='/login1' element={<Login1 />}/>

          <Route path='/signup' element={<Signup />}/>

          <Route path='/requestatutor' element={<RequestTutor/>}/>

          <Route path='/topcities' element={<TopCities/>}/>
          <Route path='/topcitiesdescription' element={<TopCitiesDescription/>}/>
          <Route path='/citycard' element={<CityCard/>}/>
          
          <Route path='/help' element={<HelpCenter/>}/>
          <Route path='/cardcomponent' element={<CardComponent/>}/>
          <Route path='/learner' element={<Learner/>}/>
          <Route path='/teacher' element={<Teacher/>}/>

          <Route path='/selecttutor' element={<StaffDetails/>}/>
          <Route path="/staff/:id" element={<StaffDetail />} />

          <Route path='/contactus' element={<ContactUs/>}/>
          <Route path='/aboutus' element={<AboutUs/>}/>

          <Route path='/footer' element={<Footer/>}/>

          <Route path='/admindashboard' element={<AdminDashboard/>}/>
          <Route path='/staffpage' element={<StaffPage/>}/>
          <Route path='/studentpage' element={<StudentPage/>}/>
          <Route path='/coursepage' element={<CoursesPage/>}/>
          <Route path='/coursebooking' element={<CourseBooking/>}/>
          <Route path='/registeredstaff' element={<RegisteredStaff/>}/>
          <Route path='/registeredstudents' element={<RegisteredStudents/>}/>
          <Route path='/registeredcourses' element={<RegisteredCourses/>}/>
          <Route path='/availablecourses' element={<AvailableCourses/>}/>
          <Route path='/feedbacksreceived' element={<FeedbacksReceived/>}/>
          <Route path='/feedbackmanagement' element={<FeedbackManagement/>}/>
          <Route path='/staffchart' element={<StaffChart/>}/>
          <Route path='/studentchart' element={<StudentChart/>}/>
          <Route path='/coursechart' element={<CourseChart/>}/>
          <Route path='/paymentmanagement' element={<PaymentManagement/>}/>
          <Route path='/studentscount' element={<StudentsCount/>}/>
          <Route path='/paymentcount' element={<PaymentCount/>}/>
          <Route path='/feedbackcount' element={<FeedbackCount/>}/>
          <Route path='/staffcount' element={<StaffCount/>}/>
          <Route path='/coursecount' element={<CourseCount/>}/>
          <Route path='/requesttutormgmt' element={<RequestTutorManagement/>}/> 
          <Route path='/becometutormgmt' element={<BecomeTutorManagement/>}/>
          <Route path='/requesttutorcount' element={<RequestTutorCount/>}/> 
          <Route path='/becometutorcount' element={<BecomeTutorCount/>}/>

          <Route path='/payment' element={<Payment/>}/>
          <Route path='/confirmation' element={<ConfirmationPage/>}/>
          <Route path='/staffconfirmation' element={<StaffConfirmation/>}/>

          <Route path='/feedback' element={<FeedbackForm/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;