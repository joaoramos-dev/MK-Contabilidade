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

- Keep viewport-aware sticky section layers in the global stylesheet, with header clearance and expandable heights; native snap and smooth scroll are off because JS paging drives scrolling. Reduced motion uses ordinary relative sections with proximity snapping.
- useSectionStack owns section geometry and discrete paging (wheel/touch/keys/anchors move one screen per gesture with an eased, locked transition); why: user wants each gesture to lock onto the next screen. Never touch Three.js.
