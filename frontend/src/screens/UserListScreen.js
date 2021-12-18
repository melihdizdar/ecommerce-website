import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';
import "../screens/Styles/UserList/userlist.css";

export default function UserListScreen(props) {
  const userList = useSelector((state) => state.userList); //list users
  const { loading, error, users } = userList; //list users
  const userDelete = useSelector((state) => state.userDelete); //delete user
  const {loading: loadingDelete,error: errorDelete,success: successDelete,} = userDelete; //delete user
  const dispatch = useDispatch(); //list users
  useEffect(() => { //list users
    dispatch(listUsers()); //list users
    dispatch({
      type: USER_DETAILS_RESET,
    });
  //}, [dispatch]); //list users
  }, [dispatch, successDelete]); //delete user
  const deleteHandler = (user) => { //delete user
    if (window.confirm('Are you sure?')) { //delete user
      dispatch(deleteUser(user._id)); //delete user
    }
  };
  return (
    <div className="userlist">
      <div className="headerStage">
        <h1>User List</h1>
      </div>
      {loadingDelete && <LoadingBox/>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (<MessageBox variant="success">User Deleted Successfully</MessageBox>)}
      {loading ? (<LoadingBox/>) : error ? (  <MessageBox variant="danger">{error}</MessageBox>) : (
        <div className="tablediv">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>IS ADMIN</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                  <td>
                    <button type="button" className="small" onClick={() => props.history.push(`/user/${user._id}/edit`)}>Edit</button>
                    <button type="button" className="small" onClick={() => deleteHandler(user)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}