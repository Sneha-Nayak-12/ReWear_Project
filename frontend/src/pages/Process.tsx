import { Link } from "react-router-dom";

export default function Process() {
  const steps = [
    {
      num: "01",
      title: "List",
      desc: "Upload three photos. Set a daily rate, sale price, or both. Takes two minutes.",
    },
    {
      num: "02",
      title: "Pickup",
      desc: "When booked, our courier collects the piece from your door, no boxing required.",
    },
    {
      num: "03",
      title: "Care",
      desc: "Every garment is professionally dry-cleaned and pressed in our atelier.",
    },
    {
      num: "04",
      title: "Wear",
      desc: "Customer receives the piece by next-day delivery, ready to wear.",
    },
    {
      num: "05",
      title: "Return",
      desc: "After the rental, we collect, clean again, and return the piece home like new.",
    },
    {
      num: "06",
      title: "Earn",
      desc: "You receive 80% of every booking. We keep 20% — that pays for cleaning, logistics and insurance.",
    },
  ];

  return (
    <div className="bg-[#fcfbf8] py-20 md:py-32">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="mb-20">
          <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-6">
            The Process
          </div>
          <h1 className="text-5xl md:text-6xl font-serif tracking-tight text-[#2c2c2c] max-w-2xl leading-tight">
            Six steps from your{" "}
            <span className="italic text-[#2a3d32]">closet</span> to someone's{" "}
            <span className="italic text-[#2a3d32]">moment.</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {steps.map((step, idx) => (
            <div key={idx} className="border-t thin-border pt-6">
              <div className="flex justify-between items-start mb-6">
                <div className="text-4xl font-serif text-[#2a3d32]">
                  {step.num}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#7a7a7a] mt-2">
                  Step
                </div>
              </div>
              <h3 className="text-xl font-serif mb-3 text-[#2c2c2c]">
                {step.title}
              </h3>
              <p className="text-sm text-[#7a7a7a] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-32 border thin-border p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 bg-[#fcfbf8]">
          <h2 className="text-3xl md:text-4xl font-serif md:w-1/2 text-[#2c2c2c]">
            Have a closet of forgotten gowns?
          </h2>
          <div className="md:w-1/2 md:pl-12 pl-0">
            <p className="text-sm text-[#7a7a7a] leading-relaxed mb-8">
              ReWear pays out monthly. We carry insurance on every piece. And we
              cap each item's "rental life" so wear stays minimal.
            </p>
            <Link
              to="/list"
              className="bg-[#2a3d32] text-white px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-semibold inline-block hover:bg-[#1f2d25] transition-colors rounded-[2px]"
            >
              List your first piece
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
