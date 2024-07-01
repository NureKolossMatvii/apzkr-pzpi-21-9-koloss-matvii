using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using ShopManager.Server.Interfaces;
using ShopManager.Server.Models;
using ShopManager.Server.Services;

namespace ShopManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SitesController : Controller
    {
        private readonly ISiteService _siteService;

        public SitesController(ISiteService siteService)
        {
            _siteService = siteService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _siteService.GetAllAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create(Site site)
        {
            await _siteService.CreateAsync(site);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _siteService.TryDeleteAsync(id);

            if (success)
            {
                return Ok();
            }

            return BadRequest();
        }


        [HttpPut]
        public async Task<IActionResult> Edit(Site category)
        {
            await _siteService.EditAsync(category);
            return Ok();
        }
    }
}
