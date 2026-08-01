function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl2 bg-white dark:bg-slate-800 p-6 shadow-soft dark:shadow-none dark:border dark:border-slate-700 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
