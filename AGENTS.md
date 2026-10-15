<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep viewport-aware sticky section layers in the global stylesheet, with header clearance and expandable heights; retain the native proximity snap container but disable panel snap alignment during stacking to avoid sticky-position scroll traps. Reduced motion uses ordinary relative sections with proximity snapping.
- Use useSectionStack only for section geometry and anchor navigation; compute negative sticky offsets for tall panels so their full content remains reachable without changing Three.js or intercepting wheel/touch input.
