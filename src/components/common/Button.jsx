function Button({ children, variant = "primary", className = "", ...props }) {
  const styles = {
    primary: "bg-primary text-white hover:bg-primary/90",
    accent:  "bg-accent text-slate-900 hover:bg-accent/90",
    outline: "border border-primary text-primary hover:bg-primary hover:text-white dark:border-primary dark:text-primary dark:hover:text-white",
  };

  return (
    <button
      className={`rounded-xl2 px-5 py-2.5 text-sm font-semibold shadow-soft transition active:scale-95 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
