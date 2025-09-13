'use client'

import Container from "@/component/Container/Container";
import Image from "next/image";


const Adds = () => {

  return (
    <section className=" py-16 ">
    
      <Container className="">
        {/* Banner Image */}
        <div className="mt-12 flex justify-center">
          <Image
            src="https://res.cloudinary.com/du04p5ikw/image/upload/v1757599281/AD6_bloocn.png"
            alt="Adds Banner"
            width={1200}
            height={200}
            className="w-full  rounded"
          />
        </div>
      </Container>
    </section>
  );
};

export default Adds;