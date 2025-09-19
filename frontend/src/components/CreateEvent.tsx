import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { PlusCircle, ArrowRight } from "lucide-react";


const CreateEvent = () => {
  return (
    <div className="flex flex-col text-gray-800 md:flex-row justify-between md:items-center gap-5 px-7">
      <div className="w-full ">
        <div className="flex flex-col space-y-4 items-center md:items-start justify-center">
          <h1 className="text-4xl font-semibold">Create Your First Event!</h1>
          <p className="text-sm md:text-start text-center">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat,
            totam mollitia sequi similique officiis molestias quo minima
            inventore, accusantium tenetur qui sunt voluptate dolore eveniet ab
            hic nam saepe ipsa.
          </p>
          <div className="flex items-center justify-center gap-x-4">
            <Button  className="bg-sky-900 hover:bg-sky-700 text-white inline-flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>Create Now!</span>
            </Button>
            <Link className="text-sm underline inline-flex items-center gap-1" to="/">
              <span>Apply now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full ">
        <img
          className="w-full max-h-64  object-cover rounded-sm"
          src="https://images.unsplash.com/photo-1618828665347-d870c38c95c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFnb3N8ZW58MHx8MHx8fDA%3D"
          alt=""
        />
      </div>
    </div>
  );
};

export default CreateEvent;
