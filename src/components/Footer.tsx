import { ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border-default">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="text-text-secondary text-sm">
            Built by{' '}
            <span className="text-text-primary font-medium">
              Brook Downton
            </span>
            , Head of Innovation
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://ralph.world"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-accent-cyan transition-colors text-sm flex items-center gap-1"
          >
            Ralph.World
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="mailto:brook@ralph.world"
            className="text-text-secondary hover:text-accent-pink transition-colors text-sm"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
