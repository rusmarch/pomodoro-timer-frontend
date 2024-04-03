import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
   selectUser,
   selectIsAuth,
   selectIsLoading,
   selectIsError,
   selectMessage,
   reset,
   login
} from '../features/auth/authSlice';
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
// import { Spinner } from '../components/Spinner';

type FormData = {
   email: string,
   password: string,
};

export const Home = () => {

   const [formData, setFormData] = useState<FormData>({
      email: '',
      password: '',
   });

   const user = useAppSelector(selectUser);
   const isAuth = useAppSelector(selectIsAuth);
   const isLoading = useAppSelector(selectIsLoading);
   const isError = useAppSelector(selectIsError);
   const message = useAppSelector(selectMessage);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const { email, password } = formData;

   useEffect(() => {
      if (isError) {
         toast.error(message);
      }
      // Redirect when logged in (if it isAuth)
      if (isAuth || user) {
         navigate('/')
      }
      dispatch(reset());
   }, [isError, isAuth, user, message, navigate, dispatch])


   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   }

   const onSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const userData = {
         email,
         password
      }

      dispatch(login(userData));
   }

   if (isLoading) {
      return /* <Spinner /> */;
   }

   return (
      <>
         <section className="heading">
            <h1>What do you need help with?</h1>
            <p>Please choose from option below</p>
         </section>

         <Link to='/new-task' className='btn btn-reverse btn-block'>
            <FaQuestionCircle />Create New Task
         </Link>

         <Link to='/tasks' className='btn btn-block'>
            <FaTicketAlt />View My Tasks
         </Link>
         <section className="form">
            <form onSubmit={onSubmit}>
               <div className="form-group">
                  <input
                     className="form-control"
                     type="email"
                     name="email"
                     placeholder="Enter your email"
                     required
                     id="email"
                     value={email}
                     onChange={onChange}
                  />
               </div>
               <div className="form-group">
                  <input
                     className="form-control"
                     type="password"
                     name="password"
                     placeholder="Enter your password"
                     required
                     id="password"
                     value={password}
                     onChange={onChange}
                  />
               </div>
               <div className="form-group">
                  <button className="btn btn-block">Submit</button>
               </div>
            </form>
         </section>
      </>
   )
}