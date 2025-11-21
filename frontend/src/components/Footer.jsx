export default function Footer() {
    return ( 
              <div className="bg-[#0c1827] text-[#FFFFFF] px-6 py-8 text-sm">
  <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-start md:justify-between">
    {/* Left: address / pitches */}
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-[#FFFFFF]/70">
        Address
      </h3>
      <p className="mt-2 text-sm">
        St Mary's School and Homerton College Sports Fields<br />
        A1134<br />
        Cambridge, CB2 8PX
      </p>
    </div>

    {/* Right: admin + socials */}
    <div className="flex flex-col items-start gap-2 md:items-end">
      <a
        href="#admin"
        className="underline hover:text-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        admin
      </a>
      <div className="flex gap-4">
        <a
          href="https://www.instagram.com/homertoncollege.afc/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          instagram
        </a>
        {/* Add more socials later if you want */}
        {/* <a ...>twitter</a> */}
      </div>
    </div>
  </div>

  {/* Bottom centre: copyright */}
  <p className="mt-6 text-center text-xs text-[#FFFFFF]/70">
    © {new Date().getFullYear()} Homerton College AFC — produced by Arthur Larkin
  </p>
</div>
    )
}