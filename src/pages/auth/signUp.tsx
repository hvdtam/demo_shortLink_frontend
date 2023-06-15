import Layout from "@/components/layout";
import Field from "@/ui/field";

const Login = () => {
  return (
    <>
      <Layout>
        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Sign Up</h2>

            <form className="mx-auto max-w-lg rounded-lg border">
              <div className="flex flex-col gap-4 p-4 md:p-8">
                <div>
                  <Field attribute="email" required={true}/>
                </div>

                <div>
                  <Field attribute="password" required={true}/>
                </div>

                <div>
                  <Field attribute="repeatPassword" required={true}/>
                </div>

                <button
                  className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">
                  Sign Up
                </button>
              </div>

              <div className="flex items-center justify-center bg-gray-100 p-4">
                <p className="text-center text-sm text-gray-500">
                  Don&lsquo;t have an account?
                  <a href="#"
                     className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Register</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  )
}
export default Login
