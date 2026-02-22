"use client";

import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("./map-picker"), {
    ssr: false,
    loading: () => (
        <div className="h-[300px] w-full rounded-md border border-slate-300 bg-slate-100 flex items-center justify-center text-slate-400">
            Loading OpenStreetMap...
        </div>
    ),
});

export function MapPickerWrapper(props: React.ComponentProps<typeof MapPicker>) {
    return <MapPicker {...props} />;
}
