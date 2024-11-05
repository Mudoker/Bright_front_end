import { Link } from 'react-router-dom';

import { useGetUsersQuery } from './usersApiSlice';

export const UsersList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetUsersQuery();

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        content = (
            <div>
                <section className="users">
                    <h1>Users List</h1>
                    <ul>
                        {users.map((user, i) => {
                            return <li key={i}>{user.fullname}</li>;
                        })}
                    </ul>
                    <Link to="/welcome">Back to Welcome</Link>
                </section>
            </div>
        );
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>;
    }

    return content;
};
// export default UsersList;
