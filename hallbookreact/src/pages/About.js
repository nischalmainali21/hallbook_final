import useAuth from "../hooks/useAuth";
export default function About() {
  let { user } = useAuth();
  return (
    <div className="mx-auto mt-10 flex min-h-screen max-w-4xl flex-col gap-12 p-2 md:w-2/3 md:gap-8 rounded-lg shadow-lg">
      About goes here
      {user && <p>Hello {user.user_id}</p>}
    </div>
  );
}
