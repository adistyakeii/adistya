const ErrorText = ({ children }: { children?: string }) => (
  <>{children && <p className="text-xs text-red-500 pt-1">{children}</p>}</>
);

export default ErrorText;
