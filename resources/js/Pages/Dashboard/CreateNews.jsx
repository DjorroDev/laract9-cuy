import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { protection } from '@/utils/jsHelper';

const formValidateNotif = () => {
  return (
    <div className="alert alert-info shadow-lg">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>Silahkan isi postingan dengan lengkap</span>
      </div>
    </div>
  )
}

export default function CreateNews(props) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [isValid, setIsValid] = useState(true)

  const handleSubmit = () => {
    const data = {
      title, description, category
    }
    return isValid && Inertia.post('/dashboard/news', data)
  }

  useEffect(() => {
    title.length >= 4 && description.length >= 10 && category.length >= 2 ? setIsValid(true) : setIsValid(false)
  }, [title, description, category])

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={
        <div className='flex flex-row justify-between'>
          <h2 className="font-semibold text-xl text-gray-800 leading-tight cursor-default">{props.page}</h2>
          <Link href={route(`${props.nextRoute}`)} as="button" className="btn btn-sm btn-link leading-tight">{props.next}</Link>
        </div>
      }
    >
      <Head title="Dashboard" />
      {protection()}
      <div className='flex flex-col justify-center items-center p-4 gap-4'>
        {!isValid && formValidateNotif()}
        <div className="w-full flex flex-row justify-center items-center gap-2">
          <input minLength={4} maxLength={50} required type="text" placeholder="Judul [min:4]" className="w-full input input-bordered input-info" onChange={(title) => setTitle(title.target.value)} />
          <input minLength={2} maxLength={20} required type="text" placeholder="Kategori [min:2]" className="w-full input input-bordered input-info" onChange={(category) => setCategory(category.target.value)} />
        </div>
        <div className='w-full'>
          <textarea minLength={10} maxLength={200} required className="textarea textarea-info w-full" placeholder="Isi berita [min:10]" onChange={(description) => setDescription(description.target.value)}></textarea>
        </div>
        <button disabled={!isValid} className="btn btn-primary lg:w-96 w-full" onClick={() => handleSubmit()}>Submit</button>
      </div >
    </Authenticated>
  )
}