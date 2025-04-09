import { Addacard } from "@/components/add-a-card"
import { Yourcards } from "@/components/your-cards"
import { Addpassword } from "@/components/add-password"
import { Yourpassword } from "@/components/your-password"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Metadata } from 'next'
import { currentUser } from "@clerk/nextjs/server"

 
export const metadata: Metadata = {
  title: 'Lock Pass',
  description: 'This is the homepage for the Lock Pass. Lock Pass is a password manager where you can save your websites and card passwords',
}


export default async function Home() {
  const user = await currentUser()
  // console.log(user?.privateMetadata)
  // console.log("Passwords Data:", JSON.stringify(user?.privateMetadata.passwords, null, 2));
  return (<div>
      {/* <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      /> */}

     <main className="container mx-auto md:px-4 py-8 max-md:px-4">
      
      <h1 className="text-xl  md:text-3xl font-bold mb-6">Your Password Manager</h1>
      {/* <div>do reload if card is not shown after adding</div> */}

      <Tabs defaultValue="passwords" className="md:w-full flex flex-wrap">
        <TabsList className="mb-6">
          <TabsTrigger value="passwords">Passwords</TabsTrigger>
          <TabsTrigger value="cards">Credit Cards</TabsTrigger>
        </TabsList>

        <TabsContent value="passwords" className="space-y-6 dark:text-black contain-content max-md: w-[100%] ">
          <div className="grid md:grid-cols-2 md:gap-6 max-md:gap-4 max-md:w-[60%] ">
            <div className="bg-white rounded-lg shadow p-1 md:p-6 border max-md:p-2 max-md:w-[100%] ">
              <h2 className="text-xl font-semibold mb-4 dark:text-black">Add a Password</h2>
              <Addpassword />
            </div>

            <div className="bg-white rounded-lg shadow p-6 border max-md:p-2 max-md:w-[100%]">
              <h2 className="text-xl font-semibold mb-4">Your Passwords</h2>
              <Yourpassword  arrayofpasswords ={Array.isArray(user?.privateMetadata.passwords)?user?.privateMetadata.passwords:[]}/>
 

            </div>
          </div>
        </TabsContent>

        <TabsContent value="cards" className="space-y-6 dark:text-black">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6 border">
              <h2 className="text-xl font-semibold mb-4">Add a Credit Card</h2>
              <Addacard />
            </div>

            <div className="bg-white rounded-lg shadow p-6 border">
              <h2 className="text-xl font-semibold mb-4">Your Cards</h2>
              <Yourcards arrayofcards ={Array.isArray(user?.privateMetadata.cards)?user?.privateMetadata.cards:[]} />
            </div>
          </div>
        </TabsContent>
      </Tabs>

    </main> 
    {/* <h1>Lock Pass</h1>
    <Link href="/main">Hi</Link> */}
  </div>
  )
}

