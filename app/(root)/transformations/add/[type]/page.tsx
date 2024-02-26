import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
   const { userId } : { userId: string | null } = auth();

  const transformation = transformationTypes[type];

  //-------------------------
  //issue authenticated user because Chrome is blockinng 3rd party requests - need to find a way to authenticate clerk user without using 3rd party cookies

  //this issue is only happening in development everything is working fine in production
 //-----------------------------

  if(!userId) redirect('/sign-in')
  const user = await getUserById(userId);


  return (
    <>
    <Header
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>

  )
}

export default AddTransformationTypePage
