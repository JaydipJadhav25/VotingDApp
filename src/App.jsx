import './App.css'
import RegisterVoter from './pages/Voter/RegisterVoter';
import {Route ,  BrowserRouter, Routes}  from "react-router-dom"
import RegisterCandidate from './pages/Candidate/RegisterCandidate';
import GetVoterList from './pages/Voter/GetVoterList';
import GetCandidateList from './pages/Candidate/GetCandidateList';
import ElectionCommision from './pages/ElectionCommision/ElectionCommision';
import Wallet from './pages/Wallet';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CastVote from './pages/castVote/CastVote';







//defind routers
const AppRoutes = () =>{

  return(
    <Routes> 
      <Route path='/' element ={<Wallet/>}/>
      <Route path='/castvote' element ={<CastVote/>}/>
      <Route path='/register-voter' element ={<RegisterVoter/>}/>
      <Route path='/register-candidate' element ={<RegisterCandidate/>}/>
      <Route path='/voter-list' element ={<GetVoterList/>}/>
      <Route path='/candidate-list' element ={<GetCandidateList/>}/>
       <Route path='/election-commision' element={ <ElectionCommision/>} />
    </Routes>
  )
}














function App() {

 

  return (
    <>
      <BrowserRouter>
      <Navbar/>
       <AppRoutes/>
       <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
