import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

// typed dispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>();

// typed selector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
