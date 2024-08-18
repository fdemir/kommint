import { createContext, useContext } from "react";

interface KommintContextProps {
  appId: string;
}

const KommintContext = createContext<KommintContextProps>({
  appId: "",
});

export const KommintProvider = ({
  children,
  appId,
}: {
  children: React.ReactNode;
  appId: string;
}) => {
  return (
    <KommintContext.Provider value={{ appId }}>
      {children}
    </KommintContext.Provider>
  );
};

export const useKommint = () => {
  const context = useContext(KommintContext);
  if (!context) {
    throw new Error("useKommint must be used within a KommintProvider");
  }
  return context;
};
