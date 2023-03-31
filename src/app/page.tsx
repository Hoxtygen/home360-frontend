"use client";
import React from "react";
import styles from "../styles/Home.module.css";
import SearchForm from "src/components/SearchForm";

export default function Page() {
  return (
    <>
      <main className={styles.main}>
        <h1 className="text-3xl text-center font-bold">
          Home Listing WorldWide in Page.tsx
        </h1>
        <div>
          <SearchForm />
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi sequi
          odit eligendi facilis earum esse, at perferendis doloremque deserunt
          culpa vitae, in quas laboriosam est neque temporibus minus reiciendis
          corporis mollitia et maiores porro. Autem, excepturi provident nulla
          nobis eum est natus eveniet vel, tempora quia similique id modi.
          Inventore obcaecati recusandae voluptatibus dicta modi!
        </p>
        <p>
          Similique voluptas porro repellendus obcaecati iure iste dolorem
          debitis consequatur sunt nesciunt rem optio, molestias eveniet?
          Perferendis deleniti nisi at culpa consectetur minima, doloremque
          ducimus rerum iusto ipsam expedita pariatur dolore reprehenderit
          veniam nostrum. Provident culpa quae expedita quisquam voluptatibus
          debitis voluptates doloremque! Pariatur autem et dignissimos minima,
          ullam nisi vitae quae consectetur repellendus enim.
        </p>
        <p>
          Repellendus facere in quia recusandae ipsa nobis quasi pariatur
          tempore, deserunt nemo ab quod ratione explicabo doloribus eaque
          consequatur? Quibusdam unde sed quod ad! Adipisci accusantium
          exercitationem, rerum a officiis doloremque. Sed tempore, animi esse
          quibusdam iste saepe fuga vero quasi nulla expedita iure, eveniet
          quisquam eaque! Reprehenderit vitae maxime facilis illum culpa.
          Aliquid, excepturi!
        </p>
      </main>
    </>
  );
}
