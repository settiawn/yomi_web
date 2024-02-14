export function Profile() {
  return (
    <div className="min-h-screen bg-dark">
      <div className="container mx-auto text-white pl-64 pt-10">
        <div className="font-bold text-8xl">user12341479352</div>
        <div className="">
          <p className="font-bold mt-10 text-xl">About Me</p>
          <p>Hello World</p>
        </div>
        <div class="fixed inset-y-0 left-36 mt-10">
          <div class="w-60 h-60 bg-gray-200 flex items-center justify-center">
            <img
              src="https://pbs.twimg.com/profile_images/1455411589453352961/oL2jTGMF_400x400.jpg"
              alt="Profile Picture"
            />
          </div>
        </div>
      </div>
      <div className=" mt-20 text-white font-bold text-5xl ml-36">Manga List</div>
    </div>
  );
}
