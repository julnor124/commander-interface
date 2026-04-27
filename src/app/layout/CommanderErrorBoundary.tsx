// CommanderErrorBoundary module.
import React from "react";

interface CommanderErrorBoundaryState {
  hasError: boolean;
}

export default class CommanderErrorBoundary extends React.Component<
  { children: React.ReactNode },
  CommanderErrorBoundaryState
> {
  state: CommanderErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): CommanderErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Keep technical detail in console, render user-safe fallback in UI.
    console.error("Commander rendering failed:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0f1c28] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#1c2f42] border border-[#2e4a66] rounded-lg p-4">
            <h2 className="text-[16px] font-semibold mb-2">Unable to render commander view</h2>
            <p className="text-[13px] text-[#c6d2de]">
              A data or rendering error occurred. Please refresh the page and try again.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
